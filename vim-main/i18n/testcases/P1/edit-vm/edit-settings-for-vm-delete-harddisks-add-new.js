'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Edit Settings for Non-ASCII VM Delete Harddisks Add New', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                Edit Settings for Non-ASCII VM Delete Harddisks Add New                  ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Edit Settings for Non-ASCII VM Delete Harddisks Add New', 'Edit VM', 'Edit Settings for Non-ASCII VM Delete Harddisks Add New', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Edit_Settings_for_Non-ASCII_VM_SATA_Delete_Harddisks_Add_New_Start');
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
        return globalUtil.verifyResult('Edit_Settings_for_Non-ASCII_VM_Delete_Harddisks_Add_New_Stop',screenshotSavePath).then(function(){
            done();
        });
    });


    it('Edit Settings for Non-ASCII VM Delete Harddisks Add New and verify', function () {
        var saveButton,editSettingsDialog;

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
            return racetrack.log("Delete current Hard disks");
        }).then(function () {
            editSettingsDialog = VMPage.createRegisterVMButton.newVMWizard;
            return globalUtil.waitForVisibility(editSettingsDialog.hardDiskSlideDown.removeButton(0,false));
        }).then(function () {
            return editSettingsDialog.hardDiskSlideDown.removeButton(0,false).click();
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
            return racetrack.log("Add a new hard disk.");
        }).then(function () {
            return vmUtil.addHardDisk(editSettingsDialog, 'addNewHDItem');
            // return vmUtil.addDevice(editSettingsDialog, 'addNewHDItem');
        }).then(function () {
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




