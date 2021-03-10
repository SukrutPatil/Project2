
const Razorpay = require("razorpay");
const crs = require("crypto-random-string");


 
let rzp = new Razorpay({
  key_id: "rzp_test_CuhF7ROD4zn4AY",
  key_secret: "KKgOXpwiNDYXwmGIoH9J3f7q",
});
/***
 * @param {number} coins
 */
const generateOrderIdForCoins = async (coins) => {
  const options = {
    amount: getCurrentPriceForCoins(coins),
    currency: 'INR',
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
        key: "rzp_test_CuhF7ROD4zn4AY",
        amount: getCurrentPriceForCoins(coins),
        currency: 'INR',
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
  
    const priceOfOneCoin = 1;
    return coins * priceOfOneCoin * 100;

};
const generateRecieptId = () => crs({ length: 10 });


module.exports = { getCheckoutOptions:getCheckoutOptions };

