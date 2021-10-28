import ApiService from './apiService';
import imageCard from './templates/image-card.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.more-btn'),
};
const apiService = new ApiService();
// let searchQuery = ' ';
refs.searchForm.addEventListener('submit', onSearch);

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
}

refs.loadMoreBtn.addEventListener('click', onLoadMore);
function onLoadMore(e) {
  apiService.fetchImages().then(appendMarkup);
}

function appendMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imageCard(hits));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
