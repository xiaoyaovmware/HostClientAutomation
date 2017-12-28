'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var ManagePage = require('../../../../login/esxUI/host/manage/managePage.js');

var SecurityAndUsersPage = require('../../../../login/esxUI/host/manage/securityAndUsers/securityAndUsersPage.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Load Authentication View', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                Load Authentication View                                 ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Load Authentication View', 'Manage', 'Load Authentication View', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Load_Authentication_View_Start');
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
        return globalUtil.verifyResult('Load_Authentication_View_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Load Authentication View', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Go to Manage > Security & users tab");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.manageMenu());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return globalUtil.waitForVisibility(ManagePage.securityAndUsersTab());
        }).then(function () {
            return ManagePage.securityAndUsersTab().click();
        }).then(function () {
            return racetrack.log("Click Authentication");
        }).then(function () {
            return globalUtil.waitForVisibility(SecurityAndUsersPage.authenticationButton.self());
        }).then(function () {
            return SecurityAndUsersPage.authenticationButton.self().click();
        }).then(function () {
            return racetrack.log("Verify that authentication view is displayed");
        }).then(function () {
            return globalUtil.waitForVisibility(SecurityAndUsersPage.authenticationButton.authJoinDomainButton());
        }).then(function () {
            return expect(SecurityAndUsersPage.authenticationButton.authJoinDomainButton().isDisplayed()).toBe(true);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        });

    });


});
