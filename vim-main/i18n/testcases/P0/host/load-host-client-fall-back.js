'use strict';

var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Load Host Client Fallback', function () {

    var loginUtil = new LoginUtil(),
        racetrack = new Racetrack(),
        esxuiUtil = new EsxuiUtil(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function (done) {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                               Load Host Client Fallback                                 ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Load Host Client - Fallback', 'Host', 'Load Host Client - Fallback', browser.params.i18n.lang, '', '', 'UI', 'P1', 'Automation').then(function () {
            return globalUtil.takeScreenshot(screenshotSavePath, 'Load_Host_Client_Fallback_Start');
        }).then(function() {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function() {
            done();
        })
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Load_Host_Client_Fallback_Stop',screenshotSavePath).then(function () {
            done();
        });
    });

    it('Load Host Client Fallback', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return loginUtil.init();
        }).then(function () {
            return racetrack.log("Verify that user name is displayed in " + browser.params.i18n.lang + ': ' + browser.params.hostMsg.host.manage.system.security.authentication.joinDomain.username);
        }).then(function () {
            return LoginPage.usernameLabel().getText();
        }).then(function (usernameLabel) {
            return expect(usernameLabel).toBe(browser.params.hostMsg.host.manage.system.security.authentication.joinDomain.username);
        }).then(function () {
            return racetrack.log("Login Host Client");
        }).then(function () {
            return loginUtil.login();
        }).then(function () {
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        }).then(function () {
            return racetrack.log("Verify that Action button is displayed in " + browser.params.i18n.lang + ': ' + browser.params.hostMsg.host.summary.actionBar.actions.label);
        }).then(function () {
            return EsxuiPage.actionsButton.self().getText();
        }).then(function (actionsButtonLabel) {
            return expect(actionsButtonLabel).toBe(browser.params.hostMsg.host.summary.actionBar.actions.label);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });

});
