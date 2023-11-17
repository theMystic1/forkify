//import the module.js component
import { async } from 'regenerator-runtime';
import * as model from './module.js';

// import the recipeview class objert
import recipeView from './views/recipe-view.js';
import searchView from './views/search-view.js';
import resultsView from './views/results-view.js';
import paginationView from './views/pagination-view.js';
import bookmarkView from './views/bookmark-view.js';
import addRecipeView from './views/addRecipe-view.js';
import { MODAL_CLOSE_SEC } from './config.js';
// console.log(recipeView);

//making our apps work on old browsers aka pollyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept;
}

const controlRecipe = async function () {
  try {
    //save the hashclick in a vaiable
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 0 update resultview to mark selected search result
    resultsView.update(model.getResultsSearchPage(1));
    // bookmarkView.render(model.state.bookmarks);
    bookmarkView.update(model.state.bookmarks);

    recipeView.showSpinner();
    // 1. fetch data

    await model.loadRecipe(id);

    // const recipe = model.state.recipe;
    //2. render recipe data
    //calling the render method with the recipe in the actual recipe object
    recipeView.render(model.state.recipe);
    // console.log(model.state.recipe);

    // resultsView.render(model.state.recipe);

    // render bookmarkview
  } catch (err) {
    // alert(err);
    // console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function (query) {
  try {
    //1) getquery
    query = searchView.getQuery();
    if (!query) return;

    //2) load results
    resultsView.showSpinner();

    await model.loadSearchResults(query);

    // render results
    // console.log(model.state.search.results);
    resultsView.render(model.getResultsSearchPage());
    //render initial pagination results
    //from here we gwt accsess to the entire search object
    paginationView.render(model.state.search);
  } catch (err) {
    // throw err;
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  //render new results
  resultsView.render(model.getResultsSearchPage(goToPage));

  //render new pagination results
  paginationView.render(model.state.search);
};

const controlServings = function (goToServ) {
  // update the recipe servings in the state
  model.updateServings(goToServ);
  // update the view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // remove bookmark
  else model.deleteBookmark(model.state.recipe.id);

  // update recipe view
  recipeView.update(model.state.recipe);

  // render the bookmark
  bookmarkView.render(model.state.bookmarks);
  bookmarkView.update(model.state.bookmarks);
};

const controlBookmarkStorage = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // render spinner
    addRecipeView.showSpinner();

    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();

    // render the bookmarkview
    bookmarkView.render(model.state.bookmarks);
    // change id in the url
    window.history.pushState(null, '', `${model.state.recipe.id}`);

    //close form
    setTimeout(() => {
      addRecipeView.handlerWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
    console.error(err);
  }
};

//EVENTS
//calling the handler method to trigger the  eventlisterner
const init = function () {
  //lS handler
  bookmarkView.addHandlerRender(controlBookmarkStorage);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSeach(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
