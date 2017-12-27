'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var NetworkingPage = require('../../../../login/esxUI/network/networkingPage.js');

var VSwitchPage = require('../../../../login/esxUI/network/vSwitch/vswitchPage.js');
var VSwitchUtils = require('../../../../login/esxUI/network/vSwitch/vswitchUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Add non-ASCII vSwitch', function () {


    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vswitchUtils = new VSwitchUtils(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName,rowsBefore,vSwitchName;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                               Add non-ASCII vSwitch                                     ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Add non-ASCII vSwitch', 'vSwitch', 'Add non-ASCII vSwitch', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Add_non-ASCII_vSwitch_Start');
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
        return globalUtil.verifyResult('Add_non-ASCII_vSwitch_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Create a new non-ASCII standard virtual switch then remove it', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return esxuiUtil.getHostName();
        }).then(function (host) {
            hostName = host;
            return globalUtil.waitForVisibility(EsxuiPage.navigator.networkMenu());
        }).then(function () {
            return racetrack.log("Click Networking in esx UI");
        }).then(function () {
            return EsxuiPage.navigator.networkMenu().click();
        }).then(function () {
            return racetrack.log("Click vSwitches tab");
        }).then(function () {
            return globalUtil.waitForVisibility(NetworkingPage.vSwitchTab());
        }).then(function () {
            return NetworkingPage.vSwitchTab().click();
        }).then(function () {
            rowsBefore = VSwitchPage.vSwitchGrid.getAllvSwitchRows();
            vSwitchName = globalUtil.getTimeStamp();
            return racetrack.log("Create a non-ASCII vSwitch: " + vSwitchName);
        }).then(function () {
            return vswitchUtils.createVswitch(VSwitchPage, EsxuiPage, vSwitchName);
        }).then(function () {
            return racetrack.log("Verify that the new vSwitch is created successfully.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Network Config', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Delete the non-ASCII vSwitch");
        }).then(function () {
            return vswitchUtils.deleteVswitch(VSwitchPage, EsxuiPage, vSwitchName);
        }).then(function () {
            return racetrack.log("Verified the vSwitch is deleted");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Network Config', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            // we expect that the test vswitch row should have been removed and
            // thus the number of rows to be unchanged.
            var rowsAfter = VSwitchPage.vSwitchGrid.getAllvSwitchRows();
            return expect(rowsAfter).toBe(rowsBefore);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        });


    });


});