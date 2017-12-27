'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var ManagePage = require('../../../../login/esxUI/host/manage/managePage.js');

var PackagesPage = require('../../../../login/esxUI/host/manage/packages/packagesPage.js');
var VMPage = require('../../../../login/esxUI/vm/vmPage.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Remember Tab State', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                    Remember Tab State                                   ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Remember Tab State', 'Manage', 'Remember Tab State', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Remember_Tab_State_Start');
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
        return globalUtil.verifyResult('Remember_Tab_State_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Remember Tab State', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Go to Manage > Packages tab");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.manageMenu());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return globalUtil.waitForVisibility(ManagePage.packagesTab());
        }).then(function () {
            return ManagePage.packagesTab().click();
        }).then(function () {
            return racetrack.log("Verify that packages page is displayed");
        }).then(function () {
            return globalUtil.waitForVisibility(PackagesPage.packageGrid());
        }).then(function () {
            return expect(PackagesPage.packageGrid().isDisplayed()).toBe(true);
        }).then(function () {
            return racetrack.log("Go to Virtual Machines page");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.vmMenu.self());
        }).then(function () {
            return EsxuiPage.navigator.vmMenu.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.createRegisterVMButton.self());
        }).then(function () {
            return expect(VMPage.createRegisterVMButton.self().isDisplayed()).toBe(true);
        }).then(function () {
            return racetrack.log("Go back to Manage page again");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.manageMenu());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return racetrack.log("Verify that packages page is still displayed");
        }).then(function () {
            return globalUtil.waitForVisibility(PackagesPage.packageUpdateButton());
        }).then(function () {
            return expect(PackagesPage.packageUpdateButton().isDisplayed()).toBe(true);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        });

    });


});
