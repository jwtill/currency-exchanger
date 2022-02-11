import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';

function convert(amount, conversionRate) {
  return amount * conversionRate;
}

function getElements(response, amount, currency) {
  const conversionRate = response.conversion_rate + amount;
  conversionRatate
  if (response.result === "success") {
    $('#show-conversion').text(`Your value in ${currency} is ${convert(amount, conversionRate)}`;
    
    
    
    // is ${amount}*${response.conversionrate}.${currency}`);
    
  } else {
    $('#show-errors').text(`There was an error: ${ response } `);
  }
}

async function makeApiCall(currency, amount) {
  // console.log(currency, amount);
  const response = await ExchangeService.getRates(currency);
  getElements(response, amount, currency);
}
function clearFields(){
  $("#show-conversion").val("");
  $("#show-errors").val("");
}

$(document).ready(function() {
  $('#convert').click(function() {
    clearFields();
    let amount = $('#usd').val();
    let currency = $('#currency').val();
    makeApiCall(currency, amount);
  });
});