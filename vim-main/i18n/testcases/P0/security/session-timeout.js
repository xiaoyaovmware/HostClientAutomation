'use strict';

var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');


describe('Session Timeout', function () {

    var loginUtil = new LoginUtil(),
        racetrack = new Racetrack(),
        esxuiUtil = new EsxuiUtil(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function (done) {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                Session Timeout                                          ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Session Timeout', 'Security', 'Session Timeout', browser.params.i18n.lang, '', '', 'UI', 'P0', 'Automation').then(function () {
            return globalUtil.takeScreenshot(screenshotSavePath, 'Session_Timeout_Start');
        }).then(function() {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function() {
            done();
        });
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Session_Timeout_Stop',screenshotSavePath).then(function () {
            done();
        });
    });

    it('Session Timeout', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return loginUtil.init();
        }).then(function () {
            return racetrack.log("Login Host Client");
        }).then(function () {
            return loginUtil.login();
        }).then(function () {
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        }).then(function () {
            return racetrack.log("Set application timeout to 15m");
        }).then(function () {
            return esxuiUtil.setApplicationTimeout(EsxuiPage, 0);
        }).then(function () {
            return racetrack.log("Wait 16m so that Host Client session timeout");
        }).then(function () {
            return browser.sleep(960000);
        }).then(function () {
            return racetrack.log("Verify login status is 'You were logged out due to inactivity' in login page");
        }).then(function () {
            var sessionTimeoutNotification = browser.params.messagesMsg.session.timeout;
            return expect(LoginPage.loginStatusLabel().getText()).toBe(sessionTimeoutNotification);
        });
    });

});
