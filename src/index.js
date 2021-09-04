import './sass/main.scss';
import { refs } from './js/refs';
import CountriesApiService from './js/fetchCountries';
import createCountryMarkup from './templates/country-markup.hbs';
import createListOfCountriesMarkup from './templates/list-of-countries.hbs';
import debounce from 'lodash.debounce';
import { error, alert } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

const countriesApiService = new CountriesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  countriesApiService.searchQuery = refs.searchFormInput.value;

  countriesApiService
    .searchCountryByName(countriesApiService.searchQuery)
    .then(data => createMarkup(data))
    .catch(err => errorHandler());
}

function renderMarkup(renderFunction, data) {
  refs.resultsContainer.insertAdjacentHTML('beforeend', renderFunction(data));
}

function createMarkup(data) {
  clearMarkup();

  if (data.length > 1 && data.length < 10) {
    renderMarkup(createListOfCountriesMarkup, data);
  } else if (data.length === 1) {
    renderMarkup(createCountryMarkup, data);
  } else if (data.length > 10) {
    alertHandler();
  }
}

function clearMarkup() {
  refs.resultsContainer.innerHTML = '';
}

function alertHandler() {
  alert({
    title: 'Too many matches!',
    text: 'Please specify your query!',
    delay: 1500,
  });
}

function errorHandler() {
  error({
    title: 'Wrong name!',
    text: 'Please enter the correct name!',
    delay: 1500,
  });
}
