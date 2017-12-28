'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Edit Settings for Non-ASCII VM Add Serial Port Network', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("               Edit Settings for Non-ASCII VM Add Add Serial Port Network                ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Edit Settings for Non-ASCII VM Add Serial Port Network', 'Edit VM', 'Edit Settings for Non-ASCII VM Add Serial Port Network', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Edit_Settings_for_Non-ASCII_VM_Add_Serial_Port_Network_Start');
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
        return globalUtil.verifyResult('Edit_Settings_for_Non-ASCII_VM_Add_Serial_Port_Network_Stop',screenshotSavePath).then(function(){
            done();
        });
    });


    it('Edit Settings for Non-ASCII VM Add Serial Port Network', function () {
        var saveButton, editSettingsDialog;

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return globalUtil.waitForVisibility(VMPage.vmGrid.getVMCheckBoxByName(vmName));
        }).then(function () {
            return racetrack.log("Select the non-ASCII VM and click Action button");
        }).then(function () {
            return VMPage.vmGrid.getVMCheckBoxByName(vmName).click();
        }).then(function () {
            return browser.sleep(2000);
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.actionsButton.self());
        }).then(function () {
            return VMPage.actionsButton.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.actionsButton.editSettingsMenu());
        }).then(function () {
            return racetrack.log("Click Edit Settings.");
        }).then(function () {
            return VMPage.actionsButton.editSettingsMenu().click();
        }).then(function () {
            return browser.sleep(10000);
        }).then(function () {
            return racetrack.log("Add a new Serial Port - Use Network serial port.");
        }).then(function () {
            editSettingsDialog = VMPage.createRegisterVMButton.newVMWizard;
            return vmUtil.addDevice(editSettingsDialog, 'addSerialPortItem');
        }).then(function () {
            return racetrack.log("Verify that new Serial Port is added.");
        }).then(function () {
            return expect(editSettingsDialog.serialPortSlideDown.self(0).isPresent()).toBe(true);
        }).then(function () {
            return racetrack.log("Select serial port type: " + 'Use Network serial port');
        }).then(function () {
            return globalUtil.waitForVisibility(editSettingsDialog.serialPortSlideDown.serialTypeDropDown.self(0,false));
        }).then(function () {
            return editSettingsDialog.serialPortSlideDown.serialTypeDropDown.self(0,false).click();
        }).then(function () {
            return globalUtil.waitForVisibility(editSettingsDialog.serialPortSlideDown.serialTypeDropDown.serialType(3));
        }).then(function () {
            return editSettingsDialog.serialPortSlideDown.serialTypeDropDown.serialType(3).click();
        }).then(function () {
            return globalUtil.waitForVisibility(editSettingsDialog.serialPortSlideDown.portURI());
        }).then(function () {
            return editSettingsDialog.serialPortSlideDown.portURI().sendKeys('http://localhost:666');
        }).then(function () {
            return racetrack.log("Click save button to save the changes.");
        }).then(function () {
            saveButton = VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_EDIT);
        }).then(function () {
            return racetrack.log("Check Recent task for edit VM and verify changes are saved");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Reconfig VM', vmName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            // Delete Recently created VM
            return vmUtil.deleteVMFromGridByName(VMPage, vmName);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_DELETE);
        });
    });


});




