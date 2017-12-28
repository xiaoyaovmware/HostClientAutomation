'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Power on/off multiple non-ASCII VM', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName1, vmName2;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                         Power on/off multiple non-ASCII VM                              ");
        console.log("-----------------------------------------------------------------------------------------");


        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Power on/off multiple non-ASCII VM', 'Power ops', 'Power on/off multiple non-ASCII VM', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Power_onoff_multiple_non-ASCII_VM_Start');
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
            vmName1 = globalUtil.getTimeStamp();
            return racetrack.log("Create a new non-ASCII VM with default settings: " + vmName1);
        }).then(function() {
            return vmUtil.createVMWithDefaultSettings(VMPage, vmName1, EsxuiPage);
        }).then(function(){
            vmName2= globalUtil.getTimeStamp();
            return racetrack.log("Create another non-ASCII VM with default settings: " + vmName2);
        }).then(function() {
            return vmUtil.createVMWithDefaultSettings(VMPage, vmName2, EsxuiPage);
        })

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Power_onoff_multiple_non-ASCII_VM_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Power on multiple non-ASCII VM and then power off', function () {
        var yesButton;

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Select the non-ASCII VMs");
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.vmGrid.getVMCheckBoxByName(vmName1))
        }).then(function () {
            return VMPage.vmGrid.getVMCheckBoxByName(vmName1).click();
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.vmGrid.getVMCheckBoxByName(vmName2))
        }).then(function () {
            return VMPage.vmGrid.getVMCheckBoxByName(vmName2).click();
        }).then(function () {
            return racetrack.log("Power on the non-ASCII VMs");
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.powerOnButton());
        }).then(function () {
            return VMPage.powerOnButton().click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_POWER_ON);
        }).then(function () {
            return racetrack.log("Verify that VMs are powered on");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Power On VM', vmName1, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Power On VM', vmName2, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.refreshButton());
        }).then(function(){
            return racetrack.log("Click Refresh button");
        }).then(function () {
            return VMPage.refreshButton().click();
        }).then(function () {
            return racetrack.log("Power off the non-ASCII VMs");
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.powerOffButton());
        }).then(function () {
            return VMPage.powerOffButton().click();
        }).then(function () {
            yesButton = VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(yesButton);
        }).then(function () {
            return racetrack.log("- - Click Yes button to power off the VM");
        }).then(function () {
            return yesButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_POWER_OFF);
        }).then(function () {
            return racetrack.log("Verify that VM is powered off");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Power Off VM', vmName1, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Power Off VM', vmName2, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return vmUtil.deleteVMFromGridByName(VMPage,vmName1);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_DELETE);
        });
    });
});




