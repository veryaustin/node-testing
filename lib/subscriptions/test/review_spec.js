var assert = require('assert');
var ReviewProcess = require('../processes/review');
var Helpers = require('./helpers/');
var sinon = require('sinon');
var DB = require('../db');
var Billing = require('../processes/billing');
var _ = require('underscore')._;
var nock = require('nock');

// Describe the Feature
describe('The Review Process', function () {
  var db = Helpers.stubDb();
  var billing = new Billing({stripeKey: 'xxx'});


  describe('Receiving a valid application', function () {
    var decision;
    var validApp = Helpers.validApplication;
    var review;
    sinon.stub(db, 'saveAssignment').yields(null, {id: 1});

    before(function (done) {

      var goodCall = nock('https://api.stripe.com/v1')
                    .post('/customers')
                    .reply(200, Helpers.goodStripeResponse);

      review = new ReviewProcess({
        application: validApp,
        db: db,
        billing: billing
      });

      sinon.spy(review, 'ensureAppValid');
      sinon.spy(review, 'findNextMission');
      sinon.spy(review, 'roleIsAvailable');
      sinon.spy(review, 'ensureRoleCompatible');

      review.processApplication(function (err, result) {
        decision = result;
        done();
      });
    });
    // Specifying behavior
    it('returns success', function () {
      assert(decision.success, decision.message);
    });
    it('ensures the application is valid', function () {
      assert(review.ensureAppValid.called);
    });
    it('returns an assignment', function () {
      assert(decision.assignment);
    });
    it('returns a subscription', function () {
      assert(decision.subscription);
    });
    it('selects the mission', function () {
      assert(review.findNextMission.called);
    });
    it('ensures a role exists', function () {
      assert(review.roleIsAvailable.called);
    });
    it('ensures role compatibility', function () {
      assert(review.ensureRoleCompatible.called);
    });
  });
  describe('Valid application, failed billing', function () {
    var decision;
    var badBillingApp = _.clone(Helpers.validApplication);
    var review;
    badBillingApp.card = 2;

    before(function (done) {

      var badCall = nock('https://api.stripe.com/v1')
        .post('/customers')
        .reply(402, Helpers.badStripeResponse);

      review = new ReviewProcess({
        application: badBillingApp,
        db: db,
        billing: billing
      });

      review.processApplication(function (err, result) {
        decision = result;
        done();
      });
    });
    it('returns false for success', function () {
      assert(!decision.success);
    });
  });
});