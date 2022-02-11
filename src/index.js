import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';

function convert(amount, currency) {
  return amount * currency;
}

function getElements(response, amount, currency) {
  const fish = convert(amount, currency);

  if (response.result === "success") {
    $('#show-conversion').text(`Your value in ${currency} is ${fish}`);
  } else {
    $('#show-errors').text(`There was an error: ${response} `);
  }
}

async function makeApiCall(currency, amount) {
  // console.log(currency, amount);
  const response = await ExchangeService.getRates(currency);
  getElements(response, amount, currency);
}
function clearFields() {
  $("#show-conversion").val("");
  $("#show-errors").val("");
}

$(document).ready(function () {
  $('#convert').click(function () {
    clearFields();
    let amount = $('#usd').val();
    let currency = $('#currency').val();
    makeApiCall(currency, amount);
  });
});