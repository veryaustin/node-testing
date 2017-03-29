var assert = require('assert');
var MemberShipApplication = require('../models/membership_application');
var moment = require('moment');
var Helpers = require('./helpers');

describe('Membership application requirements', function () {
  var validApp;

  before(function () {
    validApp = Helpers.validApplication;
  });

  describe('Application valid if...', function () {
    it('all validators successful', function () {
      assert(validApp.isValid(), 'Not valid');
    });
  });

  describe('Application invalid if...', function () {

    it('is expired', function () {
      var app = new MemberShipApplication({
        validUntil: Date.parse('01/01/2010')
      });
      assert(app.expired());
    });
    it('email is 4 characters or less', function () {
      var app = new MemberShipApplication({
        email: 'd@d'
      });
      assert(!app.emailIsValid());
    });
    it('email does not container an @', function () {
      var app = new MemberShipApplication({
        email: 'd@d'
      });
      assert(!app.emailIsValid());
    });
    it('email is omitted', function () {
      var app = new MemberShipApplication();
      assert(!app.emailIsValid());
    });
    it('height is less than 60 inches', function () {
      var app = new MemberShipApplication({
        height: 10
      });
      assert(!app.heightIsValid());
    });
    it('height is more than 75 inches', function () {
      var app = new MemberShipApplication({
        height: 80
      });
      assert(!app.heightIsValid());
    });
    it('height is omitted', function () {
      var app = new MemberShipApplication();
      assert(!app.heightIsValid());
    });
    it('age is more than 100', function () {
      var app = new MemberShipApplication();
      assert(!app.ageIsValid({
        age: 101
      }));
    });
    it('age is less than 15', function () {
      var app = new MemberShipApplication();
      assert(!app.ageIsValid({
        age: 14
      }));
    });
    it('age is omitted', function () {
      var app = new MemberShipApplication();
      assert(!app.ageIsValid());
    });
    it('weight is less than 100', function () {
      var app = new MemberShipApplication();
      assert(!app.weightIsValid({
        weight: 99
      }));
    });
    it('weight is more than 300', function () {
      var app = new MemberShipApplication({
        weight: 301
      });
      assert(!app.weightIsValid({}));
    });
    it('weight is ommitted', function () {
      var app = new MemberShipApplication();
      assert(!app.weightIsValid());
    });
    it('first is ommitted', function () {
      var app = new MemberShipApplication();
      assert(!app.nameIsValid());
    });
    it('last is ommitted', function () {
      var app = new MemberShipApplication();
      assert(!app.nameIsValid());
    });
  });
});