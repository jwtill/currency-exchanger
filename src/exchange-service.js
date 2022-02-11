export default class ExchangeService {  
  static async getRates(currency) {
    
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // console.log("API approved");
      return response.json();
    } catch(error) {
      console.log(error);
      return error.message;
    }
  }
}