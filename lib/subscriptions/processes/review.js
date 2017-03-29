var Emitter = require('events').EventEmitter;
var util = require('util');

var ReviewProcess = function (args) {
  var callback;

  // make sure the app is valid
  this.ensureAppValid = function (app) {
    if (app.isValid()) {
      this.emit('validated', app);
    } else {
      this.emit('invalid', app.validationMessage());
    }
  };
  // find the next
  this.findNextMission = function (app) {
    app.mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: []
    };
    this.emit('mission-selected', app);
  };
  // make sure role selected is available
  this.roleIsAvailable = function (app) {
    this.emit('role-available', app);
  };
  // Make sure height/weight/age is right for role
  this.ensureRoleCompatable = function (app) {
    this.emit('role-compatable', app);
  };
  // accept the app with a message
  this.acceptApplication = function (app) {
    callback(null, {
      success: true,
      message: 'Welcome to the Mars Program!'
    });
  };
  // deny the app with a message
  this.denyApplication = function (message) {
    callback(null, {
      success: false,
      message: message
    });
  };

  this.processApplication = function (app, next) {
    callback = next;
    this.emit('application-received', app);
  };

  // Event Chain
  this.on('application-received', this.ensureAppValid);
  this.on('validated', this.findNextMission);
  this.on('mission-selected', this.roleIsAvailable);
  this.on('role-available', this.ensureRoleCompatable);
  this.on('role-compatable', this.acceptApplication);

  this.on('invalid', this.denyApplication);
};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;