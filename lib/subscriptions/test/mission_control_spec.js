var moment = require('moment');
var MissionControl = require('../models/mission_control');
var Mission = require('../models/mission');
var assert = require('assert');
var db = require('../db');
var sinon = require('sinon');

// db Stub
sinon.stub(db, "getMissionByLaunchDate").yields(null, null);
sinon.stub(db, "createNextMission").yields(null, new Mission());

var missionControl = new MissionControl({
  db: db
});

describe('Mission Planning', function () {
  describe('No Current Mission Exists', function () {
    var currentMission;
    before(function (done) {
      missionControl.currentMission(function (err, res) {
        currentMission = res;
        done();
      });
    });
    it('is created if non exist', function () {
      assert(currentMission);
      assert(db.getMissionByLaunchDate.called);
    });
  });
  describe('Current Mission Exists', function () {
    var currentMission;
    before(function (done) {
      db.getMissionByLaunchDate.restore(); //unwrap it from the original sinon stub
      sinon.stub(db, 'getMissionByLaunchDate').yields(null, {id: 1000});
      missionControl.currentMission(function (err, res) {
        currentMission = res;
        done();
      });
    });
    it('is returns mission 1000', function () {
      assert(currentMission.id, 1000);
      assert(db.getMissionByLaunchDate.called);
    });
  });
});