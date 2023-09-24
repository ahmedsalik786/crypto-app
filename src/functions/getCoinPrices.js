import axios from "axios";
export const getCoinPrices=(id , days ,priceType) =>{
    const prices= axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=INR&days=${days}&interval=daily
  `
    )
    .then((response) => {
      console.log(priceType);
      console.log("Prices>>>", response.data[priceType]);
      return response.data[priceType];
    })
    .catch((err) => {
      console.log(err);
    });
    return prices;
}