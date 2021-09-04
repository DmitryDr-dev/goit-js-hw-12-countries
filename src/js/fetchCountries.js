// const BASE_URL = '
// https://restcountries.eu/rest/v2/';

export default class CountriesApiService {
  constructor() {
    this.searchQuery = '';
    this.baseUrl = 'https://restcountries.eu/rest/v2/';
  }

  searchCountryByName() {
    // https://restcountries.eu/rest/v2/name/eesti
    const url = `${this.baseUrl}name/${this.searchQuery}`;

    // запрет отправки пустой строки

    if (!this.searchQuery) {
      return;
    }

    // ! прокинуть ошибку, выполняется then
    return fetch(url).then(response => {
      if (response.ok === true) {
        return response.json();
      }

      throw new Error('ошибка');
    });
  }
}
