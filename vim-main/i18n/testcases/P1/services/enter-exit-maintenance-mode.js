'use strict';

var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Enter and exit maintenance mode', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        globalUtil = new GlobalUtil(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                         Enter and exit maintenance mode                                ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Enter and exit maintenance mode', 'Services', 'Enter and exit maintenance mode', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Enter_and_exit_maintenance_mode_Start');
        }).then(function() {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function() {
            return racetrack.log('----------------------------Precondition-------------------------------------------------');
        }).then(function(){
            return loginUtil.go();
        }).then(function(){
            return racetrack.log("Dismiss the CEIP dialog");
        }).then(function() {
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        })
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Enter_and_exit_maintenance_mode_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Enter and exit maintenance mode', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return esxuiUtil.getHostName();
        }).then(function (host) {
            hostName = host;
            return racetrack.log("Enter maintenance mode");
        }).then(function(){
            return esxuiUtil.enterMaintenanceMode(EsxuiPage);
        }).then(function () {
            return racetrack.log("Verify that host enter maintenance mode in non-ASCII environment.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Enter Maintenance Mode', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function (host) {
            return racetrack.log("Exit maintenance mode");
        }).then(function(){
            return esxuiUtil.exitMaintenanceMode(EsxuiPage);
        }).then(function () {
            return racetrack.log("Verify that host exit maintenance mode in non-ASCII environment.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Exit Maintenance Mode', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });

});
