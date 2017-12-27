'use strict';

// var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Load Feedback', function () {

    var loginUtil = new LoginUtil(),
        racetrack = new Racetrack(),
        esxuiUtil = new EsxuiUtil(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function (done) {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                               Load Feedback                                             ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Load Feedback', 'Host', 'Load Feedback', browser.params.i18n.lang, '', '', 'UI', 'P0', 'Automation').then(function () {
            return globalUtil.takeScreenshot(screenshotSavePath, 'Load_Feedback_Start');
        }).then(function() {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function() {
            done();
        });
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Load_Feedback_Stop',screenshotSavePath).then(function () {
            done();
        });
    });

    it('Load Feedback', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return loginUtil.init();
        }).then(function () {
            return racetrack.log("Login Host Client");
        }).then(function () {
            return loginUtil.login();
        }).then(function () {
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        }).then(function () {
            return racetrack.log("Click help drop down menu and select Feedback");
        }).then(function () {
            return EsxuiPage.helpDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.helpDropDown.feedbackMenu());
        }).then(function () {
            return EsxuiPage.helpDropDown.feedbackMenu().click();
        }).then(function(){
            return racetrack.log("Verify that feedback title is displayed in " + browser.params.i18n.lang + ': ' + browser.params.vfeedMsg.title);
        }).then(function () {
            return EsxuiPage.helpDropDown.feedbackDialog.title().getText();
        }).then(function (titlelabel) {
            return expect(titlelabel).toBe(browser.params.vfeedMsg.title);
        }).then(function () {
            return racetrack.log("Verify that Take screenshot button is displayed in " + browser.params.i18n.lang + ': ' + browser.params.vfeedMsg.takeScreenshotButton);
        }).then(function () {
            return EsxuiPage.helpDropDown.feedbackDialog.dialogButtonTakeScreenshot().getText();
        }).then(function (TakescreenshotButtonLabel) {
            return expect(TakescreenshotButtonLabel).toBe(browser.params.vfeedMsg.takeScreenshotButton);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        });

    });

});

