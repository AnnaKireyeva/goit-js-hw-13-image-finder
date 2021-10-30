import ApiService from './apiService';
import imageCard from './templates/image-card.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.more-btn'),
};
const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  if (apiService.query === '') {
    return alert('No data for search');
  }
  apiService.resetPage();
  apiService.fetchImages().then(hits => {
    clearGallery();
    appendMarkup(hits);
  });
  showLoadMoreBtn();
}

function onLoadMore(e) {
  apiService.fetchImages().then(appendMarkup);
}

function appendMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imageCard(hits));
  scrollPage();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function scrollPage() {
  setTimeout(() => {
    refs.loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 500);
}
