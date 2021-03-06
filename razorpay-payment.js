
const Razorpay = require("razorpay");
const crs = require("crypto-random-string");
require("dotenv").config();


 
let rzp = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});
/***
 * @param {number} coins
 */
const generateOrderIdForCoins = async (coins) => {
  const options = {
    amount: getCurrentPriceForCoins(coins),
    currency: process.env.currency,
    receipt: generateRecieptId(),
  };
  let theOrder;
  await rzp.orders.create(options, (err, order) => {
    console.log(err)
    theOrder = order
  });
  return theOrder.id;
};
/***
 * @param {number} coins
 * @return {{key,amount,currency,name,description,order,theme}} checkoutOptions
 */
 const getCheckoutOptions = async(coins) => {
    return {
        key: process.env.key_id,
        amount: getCurrentPriceForCoins(coins),
        currency: process.env.currency,
        name: 'Nusta Name',
        description: `Buying ${coins} coins`,
        order: await generateOrderIdForCoins(coins),
        theme: {
            color:'#212529'
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


module.exports = { getCheckoutOptions:getCheckoutOptions };

