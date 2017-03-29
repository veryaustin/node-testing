var assert = require('assert');
var ReviewProcess = require('../processes/review');
var Helpers = require('./helpers/');
var sinon = require('sinon');
var DB = require('../db');

// Describe the Feature
describe('The Review Process', function () {
  describe('Receiving a valid application', function () {
    // Describe a Scenario (stored in decision variable)
    var decision;
    var validApp = Helpers.validApplication;
    var review;

    before(function (done) {
      var db = Helpers.stubDb();
      review = new ReviewProcess({
        application: validApp,
        db: db
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
});