import View from './view';
import icons from 'url:../../img/icons.svg';

class WindowView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was uploaded successfully';

  _overlay = document.querySelector('.overlay');
  _modalWindow = document.querySelector('.add-recipe-window');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnOpen = document.querySelector('.nav__btn');

  constructor() {
    super();
    this.addHandlerOpenWindow();
    this.addHandlerCloseWindow();
  }
  addHandlerOpenWindow() {
    this._btnOpen.addEventListener('click', this.handlerWindow.bind(this));
  }
  addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.handlerWindow.bind(this));
    this._overlay.addEventListener('click', this.handlerWindow.bind(this));
  }

  handlerWindow() {
    this._modalWindow.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      //getting the input values with this nice method
      const dataArr = [...new FormData(this)];

      // convert it to an object to suite the recipe object
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new WindowView();
