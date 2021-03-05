import * as Razorpay from 'razorpay';
let rzp;
const getRazorpayInstance =()=>{
return rzp?rzp:new Razorpay({
key_id:'A',
key_secret:'SC'
});
}
