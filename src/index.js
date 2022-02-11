import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeService from './exchange-service.js';



function getElements(response) {
  if (response.result.success) {
    $('#show-conversion').text(`Your value in ${response.conversion_rates[0]} is conversion here`);
    
  } else {
    $('#show-errors').text(`There was an error: ${ response } `);
  }
}

async function makeApiCall(currency, amount) {
  const response = await ExchangeService.getRates(currency);
  getElements(response, amount);
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