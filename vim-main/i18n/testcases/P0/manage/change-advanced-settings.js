'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var AdvancedSettingsPage = require('../../../../login/esxUI/host/manage/advancedSettings/advancedSettingsPage.js');
var AdvancedSettingsUtil = require('../../../../login/esxUI/host/manage/advancedSettings/advancedSettingsUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Change Advanced Settings for non-ASCII VM', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        advancedSettingsUtil = new AdvancedSettingsUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName,text;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                     Change Advanced Settings for non-ASCII VM                           ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Change Advanced Settings for non-ASCII VM', 'Manage', 'Change Advanced Settings for non-ASCII VM', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Change_Advanced_Settings_for_non-ASCII_VM_Start');
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
        return globalUtil.verifyResult('Change_Advanced_Settings_for_non-ASCII_VM_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Change manage non-ASCII logDir value and reset to default', function () {


        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return esxuiUtil.getHostName();
        }).then(function (host) {
            hostName = host;
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function () {
            return racetrack.log("Click Host in esx UI");
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function () {
            return racetrack.log("Go to Manage > Advance Settings");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.manageMenu());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            // return racetrack.log("Configure Syslog.global.logDir attribute to use non-ASCII folder: " + "[] /scratch/log/" + browser.params.i18n.string);
            return racetrack.log("Configure Syslog.global.logDir attribute to use non-ASCII folder: " + "30000" + 1);   //modify
        }).then(function () {
            // text = 'Syslog.global.logDir';
            // return advancedSettingsUtil.changeAttributeValue(AdvancedSettingsPage, EsxuiPage, AdvancedSettingsPage.attributeGrid.getConfigAttribute(text), '/'+browser.params.i18n.string);
            text = 'BufferCache.FlushInterval';  //modify
            return advancedSettingsUtil.changeAttributeValue(AdvancedSettingsPage, EsxuiPage, AdvancedSettingsPage.attributeGrid.getConfigAttribute(text), ''+1);    //modify
        }).then(function () {
            // Check for recent task
            return esxuiUtil.checkForRecentTask('Update Options', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Check whether value is actually modified");
        }).then(function () {
            return advancedSettingsUtil.checkAttributeValue(AdvancedSettingsPage, AdvancedSettingsPage.attributeGrid.getConfigAttribute(text), '30000' + 1);
        }).then(function () {
            return racetrack.log("Reset the attribute to default value");
        }).then(function () {
            return advancedSettingsUtil.resetDefaultAttributeValue(AdvancedSettingsPage, EsxuiPage, AdvancedSettingsPage.attributeGrid.getConfigAttribute(text));
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Options', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Check whether value is actually modified");
        }).then(function () {
            var defaultValue = '30000';
            return advancedSettingsUtil.checkAttributeValue(AdvancedSettingsPage, AdvancedSettingsPage.attributeGrid.getConfigAttribute(text), defaultValue);
        });


    });


});
