// Store Stripe Key in non git tracked file
var stripeKey = require('./secrets').stripe_secret;
var Billing = require('./processes/billing');

var billing = new Billing({
  stripeKey: stripeKey
});

billing.createSubscription({
  email: 'test@test.com',
  name: 'Austin Lauritsen',
  card: {
    name: 'Austin Lauritsen',
    number: '4111111111111111',
    exp_month: 10,
    exp_year: 2019
  },
  plan: 'commander' // obtained with Stripe.js
}, function (err, res) {
  console.log(err);
  console.log(res);
});