const KEY = '24065015-abf144b31d6566bdcce4b2cfb';
const BASE_URL = 'https://pixabay.com/api/';

export default class ApiService {
  constructor() {
    this.searchQuery = ' ';
    this.page = 1;
  }

  fetchImages() {
    // const KEY = '24065015-abf144b31d6566bdcce4b2cfb';
    // const BASE_URL = 'https://pixabay.com/api/';
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        // console.log('before:', this);
        console.log(data);
        this.incrementPage();
        // console.log('after:', this);
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
