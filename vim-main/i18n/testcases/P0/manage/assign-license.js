'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var ManagePage = require('../../../../login/esxUI/host/manage/managePage.js');

var LicensingPage = require('../../../../login/esxUI/host/manage/licensing/licensingPage.js');
var LicensingUtil = require('../../../../login/esxUI/host/manage/licensing/licensingUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Assign License', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        licensingUtil = new LicensingUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                      Assign License                                     ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Assign License', 'Manage', 'Assign License', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Assign_License_Start');
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
        });

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Assign_License_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Assign license in non-ASCII environment', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function () {
            return racetrack.log("Go to Manage > Licensing tab");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.manageMenu());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return globalUtil.waitForVisibility(ManagePage.licensingTab());
        }).then(function () {
            return ManagePage.licensingTab().click();
        }).then(function () {
            return racetrack.log("Assign a license to the host");
        }).then(function () {
            return licensingUtil.assignLicense(LicensingPage, EsxuiPage, '0M0J1-CWKE0-78VP9-0KEHP-0413L');  //modify
        }).then(function () {
            return racetrack.log("Check for recent task and verify that license is assigned successfully");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update License', 'None', browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });


});
