import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';


function getElements(response, amount) {
  if (response.result === "success" && response.error_type != "unsupported-code") {
    const conversionRate = response.conversion_rates['USD'];
    clearFields();
    $('.results').show();
    $('#show-conversion').text(`Your U.S. $${amount} is worth  ${amount * conversionRate} ${response.base_code}`);
    $('#show-conversion').text(`Your U.S. $${amount} is worth  ${Math.round((amount * conversionRate)*100)/100} ${response.base_code}`);
  } else {
    $('.results').show();
    $('#show-errors').text(`There was an error: ${response.message} `);
  }
}

async function makeApiCall(currency, amount) {
  const response = await ExchangeService.getRates(currency);
  getElements(response, amount);
}
function clearFields() {
  $("#show-conversion").text("");
  $("#show-errors").text("");
}

$(document).ready(function () {
  $('#convert').click(function () {
    clearFields();
    let amount = $('#usd').val();
    let currency = $('#currency').val();
    if ((parseInt(amount) <= 0) || (amount === "")) {
      clearFields();
      $('.results').show();
      $('#show-errors').text('Please enter a number greater than 0');
    } else {
      makeApiCall(currency, amount);
    }
  });
});