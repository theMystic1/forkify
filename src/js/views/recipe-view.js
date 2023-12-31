//import the parent class file
import View from './view.js';
//importing icons from the icon directory
import icons from 'url:../../img/icons.svg';
// importing the  al kiniko
class RecipeView extends View {
  // the parent element
  _parentElement = document.querySelector('.recipe');
  // the renderable data

  _errorMessage = 'Could not find recipe, kindly try another one';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  addHandlerRender(handler) {
    const events = ['hashchange', 'load'];
    events.forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');

      if (!btn) return;

      const goTo = +btn.dataset.goto;
      // console.log(btn);
      if (goTo > 0) handler(goTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');

      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    // console.log(this.#data);
    return `
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="${this._data.title}"
}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-goto="${
          this._data.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-goto="${
          this._data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
      <svg>
       <use href="${icons}#icon-user"></use>
     </svg>
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    } "></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients.map(this._generateMarkupIng).join('')}
     

      
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      ${this._data.sourceUrl}
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>

`;
  }

  // map callBackFunction
  _generateMarkupIng(ing) {
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}/icons.svg#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            ing.quantity ? ing.quantity : ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>${ing.description}
          </div>
        </li>
      `;
  }
}

export default new RecipeView();
