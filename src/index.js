import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';

$(document).ready(function() {
  console.log("Wassup");
});

function getElements(response) {
  if (response.main) {
    $('.showConversion').text(`Your value in ${response.conversion_rates[0]} is ${response.${<--val of input-->}}`);
    
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(currency) {
  const response = await ExchangeService.getRates(currency);
  getElements(response);
}