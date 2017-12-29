'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var ManagePage = require('../../../../login/esxUI/host/manage/managePage.js');

var SystemPage = require('../../../../login/esxUI/host/manage/system/systemPage.js');
// var SystemUtil = require('../../../../login/esxUI/host/manage/system/systemUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Config negative time and date', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();
        // systemUtil = new SystemUtil();

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                          Config negative time and date                                  ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Config negative time and date', 'Manage', 'Config negative time and date', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Config_negative_time_and_date_Start');
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
        return globalUtil.verifyResult('Config_negative_time_and_date_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Config negative time and date', function () {


        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Go to Manage > System tab");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.manageMenu());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return globalUtil.waitForVisibility(ManagePage.systemTab())
        }).then(function () {
            return ManagePage.systemTab().click();
        }).then(function () {
            return racetrack.log("- - Click Time & date");
        }).then(function () {
            return globalUtil.waitForVisibility(SystemPage.timedateButton.self());
        }).then(function () {
            return SystemPage.timedateButton.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(SystemPage.timedateButton.editsettingsButton.self());
        }).then(function () {
            return racetrack.log("- - Click Edit settings button");
        }).then(function () {
            return SystemPage.timedateButton.editsettingsButton.self().click();
        }).then(function(){
            return racetrack.log("- - Select 'Manually configure the date and time on this host' ");
        }).then(function () {
            return globalUtil.waitForVisibility(SystemPage.timedateButton.editsettingsButton.manuallyRadio());
        }).then(function(){
            return SystemPage.timedateButton.editsettingsButton.manuallyRadio().click();
        }).then(function(){
            return racetrack.log("- - Config time as empty");
        }).then(function(){
            return SystemPage.timedateButton.editsettingsButton.datetimetext().sendKeys('');
        }).then(function(){
            return SystemPage.timedateButton.editsettingsButton.datetimetext().clear();
        }).then(function(){
            return racetrack.log("- - Click Save Button");
        }).then(function(){
            return SystemPage.popUpDialog.okButton().click();
        }).then(function(){
            return racetrack.log("Verify that error message pops up");
        }).then(function () {
            return expect(SystemPage.timedateButton.editsettingsButton.clearValidationBannerButton().isDisplayed()).toBe(true);
        }).then(function () {
            return racetrack.log("Verify that error message is displayed in " + browser.params.i18n.lang + ': ' + browser.params.hostMsg.host.manage.system.timeAndDate.dialog.validation.emptyDate);
        }).then(function () {
            return SystemPage.timedateButton.editsettingsButton.validationmessagetext().getText();
        }).then(function (validationmessageLabel) {
            return expect(validationmessageLabel).toBe(browser.params.hostMsg.host.manage.system.timeAndDate.dialog.validation.emptyDate);
        }).then(function () {
            return SystemPage.timedateButton.editsettingsButton.clearValidationBannerButton().click();
        }).then(function () {
            return SystemPage.popUpDialog.cancelButton().click();
        })

    });


});
