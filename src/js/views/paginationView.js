import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, there are other pages
    if (this._curPage === 1 && numPages > 1)
      return this._generateMarkupNextButton();

    // Last page
    if (this._curPage === numPages && numPages > 1)
      return this._generateMarkupPrevButton();

    // Other page
    if (this._curPage > 1 && this._curPage < numPages) {
      let markup = this._generateMarkupPrevButton();
      markup += this._generateMarkupNextButton();
      return markup;
    }

    // Page 1, there are NO other pages
    return '';
  }

  _generateMarkupPrevButton() {
    return `
          <button data-goto="${
            this._curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._curPage - 1}</span>
          </button>
    `;
  }
  _generateMarkupNextButton() {
    return `
          <button data-goto="${
            this._curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${this._curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
  }
}

export default new PaginationView();
