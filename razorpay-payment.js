import * as Razorpay from "razorpay";
import * as crs from "crypto-random-string";
import * as dotenv from 'dotenv';
dotenv.config();

 
let rzp = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});
/***
 * @param {number} coins
 */
const generateOrderIdForCoins = (coins) => {
  const options = {
    amount: getCurrentPriceForCoins(coins),
    currency: process.env.currency,
    receipt: generateRecieptId(),
  };
  let theOrder;
  rzp.orders.create(options, (err, order) => (theOrder = order));
  return theOrder.id;
};
/***
 * @param {number} coins
 * @return {{key,amount,currency,name,description,order,theme}} checkoutOptions
 */
const getCheckoutOptions = (coins) => {
    return {
        key: process.env.key_id,
        amount: getCurrentPriceForCoins(coins),
        currency: process.env.currency,
        name: 'Nusta Name',
        description: `Buying ${coins} coins`,
        order: generateOrderIdForCoins(coins),
        theme: {
            color:'#000000'
        }
}};
/***
 * @param {number} coins
 * @return {number}
 */
const getCurrentPriceForCoins = (coins) => {
  if (process.env.currency === "INR") {
    const priceOfOneCoin = 1;
    return coins * priceOfOneCoin * 100;
  }
  return coins;
};
const generateRecieptId = () => crs({ length: 10 });
module.exports = { getCheckoutOptions };

