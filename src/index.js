import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';


function getElements(response, amount) {
  if (response.result === "success") {
    const conversionRate = response.conversion_rates['USD'];
    $('#show-conversion').text(`Your U.S. $${amount} is worth  ${amount * conversionRate} ${response.base_code}`);
  } else {
    $('#show-errors').text(`There was an error: ${response} `);
  }
}

async function makeApiCall(currency, amount) {
  const response = await ExchangeService.getRates(currency);
  getElements(response, amount);
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