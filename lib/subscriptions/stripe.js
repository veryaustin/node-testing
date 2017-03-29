// Store Stripe Key in non git tracked file
var stripeKey = require('./secrets').stripe_secret;
var stripe = require('stripe')(
  stripeKey
);

stripe.customers.create({
  email: 'test@test.com',
  description: 'Test User',
  card: {
    name: 'Test User',
    number: '4111111111111111',
    exp_month: 10,
    exp_year: 2019
  },
  plan: 'commander' // obtained with Stripe.js
}, function (err, customer) {
  console.log(err);
  console.log(customer);
});