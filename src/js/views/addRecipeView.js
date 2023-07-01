import View from './View.js';
import icons from '../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpenRecipe = document.querySelector('.nav__btn--add-recipe');
  _btnCloseRecipe = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpenRecipe.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnCloseRecipe.addEventListener(
      'click',
      this.toggleWindow.bind(this)
    );
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const recipeData = Object.fromEntries(dataArr);
      handler(recipeData);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();