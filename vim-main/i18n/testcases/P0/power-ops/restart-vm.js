'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Restart Non-ASCII VM', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                               Restart Non-ASCII VM                                      ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Restart Non-ASCII VM', 'Power ops', 'Restart Non-ASCII VM', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Restart_Non-ASCII_VM_Start');
        }).then(function() {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function() {
            return racetrack.log('----------------------------Precondition-------------------------------------------------');
        }).then(function(){
            return loginUtil.go();
        }).then(function(){
            return racetrack.log("Dismiss the CEIP dialog");
        }).then(function(){
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        }).then(function(){
            return racetrack.log("Click Virtual Machines in esx UI");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.vmMenu.self());
        }).then(function(){
            return EsxuiPage.navigator.vmMenu.self().click();
        }).then(function(){
            vmName = globalUtil.getTimeStamp();
            return racetrack.log("Create a new non-ASCII VM with default settings: " + vmName);
        }).then(function() {
            return vmUtil.createVMWithDefaultSettings(VMPage, vmName, EsxuiPage);
        })

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Restart_Non-ASCII_VM_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Restart a non-ASCII VM', function () {


        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Power on the non-ASCII VM");
        }).then(function () {
            return vmUtil.powerOnVMFromGridByName(VMPage,vmName);
        }).then(function(){
            return racetrack.log("Verify that the non-ASCII VM is powered on");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Power On VM', vmName, browser.params.taskMsg.task.state.success,3);
        }).then(function(){
            return racetrack.log("Restart the non-ASCII VM");
        }).then(function () {
            return vmUtil.resetVMFromGridByName(VMPage,vmName);
        }).then(function(){
            return racetrack.log("Verify that the non-ASCII VM is restarted");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Reset VM', vmName, browser.params.taskMsg.task.state.success,3);
        }).then(function(){
            return racetrack.log("Power off and delete the VM");
        }).then(function () {
            return vmUtil.powerOffVMFromGridByName(VMPage,vmName);
        }).then(function () {
            return vmUtil.deleteVMFromGridByName(VMPage, vmName);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_DELETE);
        });
    });

});




