var assert = require('assert');
var ReviewProcess = require('../processes/review');
var MembershipApplication = require('../models/membership_application');

// Describe the Feature
describe('The Review Process', function () {
  describe('Receiving a valid application', function () {
    // Describe a Scenario (stored in decision variable)
    var decision;
    before(function (done) {
      var validApp = new MembershipApplication({
        first: 'Test',
        last: 'User',
        email: 'test@test.com',
        age: 30,
        height: 66,
        weight: 180
      });
      var review = new ReviewProcess();
      review.processApplication(validApp, function (err, result) {
        decision = result;
        done();
      });
    });
    // Specifying behavior
    it('returns success', function () {
      assert(decision.success, decision.message);
    });
  });
});