import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';

function getElements(rateObj, currencyTo) {
  if (rateObj.result === "success" && rateObj.error_type != "unsupported-code") {
    const conversionRate = rateObj.conversion_rates[currencyTo];
    return conversionRate;
  }
  else {
    $('.results').show();
    $('#show-errors').text(`There was an error: ${rateObj} `);
  }
}
function convertCurrency(conversionRate, amount) {
  return Math.round((conversionRate * amount) * 100) / 100;
}
function displayElements(conversion, amount, rateObj, currencyTo) {
  $('#show-conversion').text(`Your ${amount} ${rateObj.base_code} is worth   ${conversion} ${currencyTo}`);
}

async function makeApiCall(currencyFrom, amount, currencyTo) {
  const rateObj = await ExchangeService.getRates(currencyFrom);
  const parsedRate = getElements(rateObj, currencyTo);
  const conversion = convertCurrency(parsedRate, amount);
  if(conversion) {
    displayElements(conversion, amount, rateObj, currencyTo);
  }
}

function clearFields() {
  $("#show-conversion").text("");
  $("#show-errors").text("");
}
function checkInput(input) {
  if ((parseInt(input) <= 0) || (input === "") || (input === isNaN())) {
    clearFields();
    $('.results').show();
    $('#show-errors').text('Please enter a number greater than 0');
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
      $('.results').show();
      makeApiCall(currencyFrom, amount, currencyTo);
    } else {
      return false;
    }
  });
});