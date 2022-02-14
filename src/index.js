import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';

function getElements(parsedResponse, currencyTo) {
  if (parsedResponse.result === "success" && parsedResponse.error_type != "unsupported-code") {
    const conversionRate = parsedResponse.conversion_rates[currencyTo];
    return conversionRate;
  }
  else {
    $('.results').show();
    $('#show-errors').text(`There was an error: ${parsedResponse}.`);
  }
}
function convertCurrency(conversionRate, amount) {
  const conversion = Math.round((conversionRate * amount) * 100) / 100;
  return conversion;
}
function displayElements(amount, currencyTo, rateObj, conversion) {
  $('#show-conversion').text(`Your ${amount} ${rateObj.base_code} is worth   ${conversion} ${currencyTo}.`);
}

async function makeApiCall(amount, currencyFrom, currencyTo) {
  const rateObj = await ExchangeService.getRates(currencyFrom);
  const parsedRate = getElements(rateObj, currencyTo);
  const conversion = convertCurrency(parsedRate, amount);
  if (rateObj.result === "success") {
    displayElements(amount, currencyTo, rateObj, conversion);
  }
}

function clearFields() {
  $("#show-conversion").text("");
  $("#show-errors").text("");
}
function checkInput(input) {
  if ((parseInt(input) <= 0) || (input === "") || (input === isNaN())) {
    clearFields();
    $('.results').fadeIn();
    $('#show-errors').text('There was an error: Please enter a number greater than zero.');
    return false;
  } else {
    return true;
  }
}

$(document).ready(function () {
  $('#convert').click(function () {
    clearFields();
    let amount = $('#amt').val();
    let currencyFrom = $('#currencyFrom').val();
    let currencyTo = $('#currencyTo').val().toUpperCase();
    if (checkInput(amount)) {
      $('.results').fadeIn();
      makeApiCall(amount, currencyFrom, currencyTo);
    } else {
      return false;
    }
  });
});