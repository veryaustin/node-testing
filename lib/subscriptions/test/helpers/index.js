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
  role: 'commander'
});

exports.stubDb = function (args) {
  args || (args = {});
  var mission = args.mission || new Mission();
  var db = new DB();
  sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
  sinon.stub(db, 'createNextMission').yields(null, mission);
  return db;
};

exports.goodStripeResponse = function (args) {
  var plan = args.plan || 'commander';
  {
    id: 'cus_BHJn7F1UV40wJU',
      object: plan,
      account_balance: 0,
      created: 1503680373,
      currency: 'usd',
      default_source: 'card_1Aul9dD8KlPxbL4ZWmRWo2BM',
      delinquent: false,
      description: 'Test User',
      discount: null,
      email: 'test@test.com',
      livemode: false,
      metadata: { },
      shipping: null,
      sources: 
      {
        object: 'list',
        data: [[Object]],
        has_more: false,
        total_count: 1,
        url: '/v1/customers/cus_BHJn7F1UV40wJU/sources'
      },
    subscriptions:
      {
        object: 'list',
        data: [[Object]],
        has_more: false,
        total_count: 1,
        url: '/v1/customers/cus_BHJn7F1UV40wJU/subscriptions'
      },
    cards:
      {
        object: 'list',
        data: [[Object]],
        has_more: false,
        total_count: 1,
        url: '/v1/customers/cus_BHJn7F1UV40wJU/cards'
      },
    default_card: 'card_1Aul9dD8KlPxbL4ZWmRWo2BM'
  }
}