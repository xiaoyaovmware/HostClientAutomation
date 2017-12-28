'use strict';

var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Log into Host Client with invalid credentials', function () {

    var loginUtil = new LoginUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function (done) {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                   Log into Host Client with invalid credentials                         ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Log into Host Client with invalid credentials', 'Host', 'Log into Host Client with invalid credentials', browser.params.i18n.lang, '', '', 'UI', 'P1', 'Automation').then(function () {
            return globalUtil.takeScreenshot(screenshotSavePath, 'Log_into_Host_Client_with_invalid_credentials_Start');
        }).then(function() {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function() {
            done();
        })
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Log_into_Host_Client_with_invalid_credentials_Stop',screenshotSavePath).then(function () {
            done();
        });
    });

    it('Log into Host Client with invalid credentials', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return loginUtil.init();
        }).then(function () {
            return racetrack.log("Login Host Client with invalid username and password: " + browser.params.i18n.string + " " + browser.params.i18n.string);
        }).then(function () {
            return loginUtil.login(browser.params.i18n.string, browser.params.i18n.string);
        }).then(function () {
            return browser.sleep(15000);
        }).then(function () {
            return racetrack.log("Verify that log in page is displayed with status: " + browser.params.missingMsg.loginError);
        }).then(function () {
            return LoginPage.loginStatusLabel().getText();
        }).then(function (shutdownStatus) {
            return expect(shutdownStatus).toBe(browser.params.missingMsg.loginError);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });

});
