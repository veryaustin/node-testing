var MemberShipApplication = require('../../models/membership_application');
var sinon = require('sinon');
var DB = require('../../db');
var Mission = require('../../models/mission');
var Assignment = require('../../models/assignment');

exports.validApplication = new MemberShipApplication({
  first: 'Test',
  last: 'User',
  email: 'test@test.com',
  age: 30,
  height: 66,
  weight: 180,
  role: 'commander',
  card: 1
});

exports.stubDb = function (args) {
  args || (args = {});
  var mission = args.mission || new Mission();
  var db = new DB();
  sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
  sinon.stub(db, 'createNextMission').yields(null, mission);
  return db;
};

exports.goodStripeArgs = {
  name: 'Test User',
  email: 'test@test.com',
  plan: 'commander',
  card: 1
};

exports.badStripeArgs = {
  name: 'Test User',
  email: 'test@test.com',
  plan: 'commander',
  card: 2
};

exports.goodStripeResponse = function (args) {
  args || (args = {});
  var plan = args.plan || 'commander';
  return {
    id: 'cus_BHKRLnq8LXfXkQ',
    object: plan,
    account_balance: 0,
    created: 1503682797,
    currency: 'usd',
    default_source: 'card_1AulmjD8KlPxbL4ZYaOIUP6g',
    delinquent: false,
    description: 'Austin Lauritsen',
    discount: null,
    email: 'test@test.com',
    livemode: false,
    metadata: {},
    shipping: null,
    sources: {
      object: 'list',
      data: [
        [Object]
      ],
      has_more: false,
      total_count: 1,
      url: '/v1/customers/cus_BHKRLnq8LXfXkQ/sources'
    },
    subscriptions: {
      object: 'list',
      data: [
        [Object]
      ],
      has_more: false,
      total_count: 1,
      url: '/v1/customers/cus_BHKRLnq8LXfXkQ/subscriptions'
    },
    cards: {
      object: 'list',
      data: [
        [Object]
      ],
      has_more: false,
      total_count: 1,
      url: '/v1/customers/cus_BHKRLnq8LXfXkQ/cards'
    },
    default_card: 'card_1AulmjD8KlPxbL4ZYaOIUP6g'
  };
}();

exports.badStripeResponse = function () {

  return {
    rawType: 'card_error',
    code: 'card_declined',
    param: undefined,
    message: 'Your card was declined.',
    detail: undefined,
    raw: {
      message: 'Your card was declined.',
      type: 'card_error',
      code: 'card_declined',
      decline_code: 'generic_decline'
    },
    error: 'Your card was declined',
    type: 'StripeCardError'
  };
}();