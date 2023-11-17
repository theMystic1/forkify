import View from './view.js';
//importing icons from the icon directory
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  // the parent element
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    // this._data becomes the entire search obj results
    //1. get num pages and eound to the next highest integer

    const curPage = this._data.pageStart;
    // console.log(curPage);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);
    // when on the first page and there are other pages
    if (curPage === 1 && numPages > 1) {
      // return `
      //     <button class="btn--inline pagination__btn--next">
      //       <span>Page ${curPage + 1}</span>
      //       <svg class="search__icon">
      //         <use href="${icons}.svg#icon-arrow-right"></use>
      //       </svg>
      //     </button>
      // `;
      return this.generateMarkupBtns(
        '#icon-arrow-right',
        curPage + 1,
        'pagination__btn--next'
      );
    }
    // when on the first page and no other pages
    if (curPage === 1 && numPages === 1) {
      return '';
    }
    // when on another page and there are other pages
    if (curPage < numPages) {
      // return `

      //     <button class="btn--inline pagination__btn--prev">
      //       <svg class="search__icon">
      //         <use href="${icons}.svg#icon-arrow-left"></use>
      //       </svg>
      //       <span>Page ${curPage - 1}</span>
      //    </button>

      //    <button class="btn--inline pagination__btn--next">
      //       <span>Page ${curPage + 1}</span>
      //       <svg class="search__icon">
      //         <use href="${icons}.svg#icon-arrow-right"></use>
      //       </svg>
      //     </button>
      // `;

      return `
      ${this.generateMarkupBtns(
        '#icon-arrow-left',
        curPage - 1,
        'pagination__btn--prev'
      )}

      ${this.generateMarkupBtns(
        '#icon-arrow-right',
        curPage + 1,
        'pagination__btn--next'
      )};
      `;
    }
    // when on the last page
    if (curPage === numPages && numPages > 1) {
      // return `
      //   <button class="btn--inline pagination__btn--prev">
      //     <svg class="search__icon">
      //       <use href="${icons}.svg#icon-arrow-left"></use>
      //     </svg>
      //     <span>Page ${curPage - 1}</span>
      //  </button>
      // `;
      return this.generateMarkupBtns(
        '#icon-arrow-left',
        curPage - 1,
        'pagination__btn--prev'
      );
    }
  }

  generateMarkupBtns(icon, gotoPage, className) {
    return `
    <button data-goto="${gotoPage}" class="btn--inline ${className}">
      <svg class="search__icon">
        <use href="${icons}${icon}"></use>
      </svg>
      <span>Page ${gotoPage}</span>
   </button>
  `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      //this data attribute helps in establishing a life connection btwn the dom and the code

      if (!btn) return;
      const go2page = +btn.dataset.goto;
      handler(go2page);
    });
  }
}

export default new PaginationView();
