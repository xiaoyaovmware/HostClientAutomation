'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Edit Settings for Non-ASCII VM Add SCSI controller VMware Paravirtual Hot Add', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("      Edit Settings for Non-ASCII VM Add SCSI controller VMware Paravirtual Hot Add      ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Edit Settings for Non-ASCII VM Add SCSI controller VMware Paravirtual Hot Add', 'Edit VM', 'Edit Settings for Non-ASCII VM Add SCSI controller VMware Paravirtual Hot Add', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Edit_Settings_for_Non-ASCII_VM_Add_SCSI_controller_VMware_Paravirtual_Hot_Add_Start');
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
        return globalUtil.verifyResult('Edit_Settings_for_Non-ASCII_VM_Add_SCSI_controller_VMware_Paravirtual_Hot_Add_Stop',screenshotSavePath).then(function(){
            done();
        });
    });


    it('Edit Settings for Non-ASCII VM Add SCSI controller VMware Paravirtual Hot Add', function () {
        var saveButton, editSettingsDialog,editSettingsMenu;

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Power on the non-ASCII VM");
        }).then(function () {
            return vmUtil.powerOnVMFromGridByName(VMPage,vmName);
        }).then(function () {
            return racetrack.log("Verify that VM is powered on");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Power On VM', vmName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.vmGrid.getVMLinkByName(vmName));
        }).then(function(){
            return browser.actions().mouseMove(VMPage.vmGrid.getVMLinkByName(vmName)).perform();
        }).then(function(){
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function() {
            return browser.sleep(1000);
        }).then(function(){
            return racetrack.log("- - Select Edit Settings menu");
        }).then(function(){
            editSettingsMenu = VMPage.vmGrid.rightClickContextMenu.editSettingsMenu();
            return globalUtil.waitForVisibility(editSettingsMenu);
        }).then(function () {
            return editSettingsMenu.click();
        }).then(function () {
            return racetrack.log("Add a new SCSI controller - VMware Paravirtual");
        }).then(function () {
            editSettingsDialog = VMPage.createRegisterVMButton.newVMWizard;
            return vmUtil.addDevice(editSettingsDialog, 'AddSCSIControllerItem');
        }).then(function () {
            return racetrack.log("Verify that new SCSI controller is added.");
        }).then(function () {
            return expect(editSettingsDialog.scsiControllerSlideDown.self(1).isPresent()).toBe(true);
        }).then(function () {
            return racetrack.log("Select SCSI type: VMware Paravirtual");
        }).then(function () {
            return globalUtil.waitForVisibility(editSettingsDialog.scsiControllerSlideDown.scsiControllerDropDown.self(1,false));
        }).then(function () {
            return editSettingsDialog.scsiControllerSlideDown.scsiControllerDropDown.self(1,false).click();
        }).then(function () {
            return globalUtil.waitForVisibility(editSettingsDialog.scsiControllerSlideDown.scsiControllerDropDown.scsiControllerType(2));
        }).then(function () {
            return editSettingsDialog.scsiControllerSlideDown.scsiControllerDropDown.scsiControllerType(2).click();
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
            return vmUtil.powerOffVMFromGridByName(VMPage,vmName);
        }).then(function () {
            // Delete Recently created VM
            return vmUtil.deleteVMFromGridByName(VMPage, vmName);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_DELETE);
        });
    });


});




