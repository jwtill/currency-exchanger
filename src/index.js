import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';

// function createPath(currency) {
//   let path1 = "response.conversion_rates.";
//   let fullPath = path1.concat(currency);
//   return fullPath;

// }

function getElements(response, currency, amount) {
  // const fish = convert(amount, currency);

  if (response.result === "success") {
    // let result = createPath(currency);
    $('#show-conversion').text(`Your ${amount} is worth  ${response.base_code} is *****`);

    // $('#show-conversion').text(`${result}`);
    // $('#show-conversion').append(`The humidity in ${response.conversion_rates} is ${response.base_code}`);
  } else {
    $('#show-errors').text(`There was an error: ${response} `);
  }
}

async function makeApiCall(currency, amount) {
  const response = await ExchangeService.getRates(currency);
  getElements(response, currency, amount);
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