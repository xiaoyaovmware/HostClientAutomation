'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Edit Settings for Non-ASCII VM Negative', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                      Edit Settings for Non-ASCII VM Negative                            ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Edit Settings for Non-ASCII VM Negative', 'Edit VM', 'Edit Settings for Non-ASCII VM Negative', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Edit_Settings_for_Non-ASCII_VM_Negative_Start');
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
        return globalUtil.verifyResult('Edit_Settings_for_Non-ASCII_VM_Negative_Stop',screenshotSavePath).then(function(){
            done();
        });
    });


    it('Edit RAM memory and hard disk size for non-ASCII VM Negative and verify', function () {
        var editSettingsDialog, hardDiskSlideDown, networkAdapterSlideDown, saveButton, cancelButton;

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
            return racetrack.log("Chang RAM to 123 MB");
        }).then(function () {
            editSettingsDialog = VMPage.createRegisterVMButton.newVMWizard;
            return globalUtil.waitForVisibility(editSettingsDialog.memoryTextbox(0));
        }).then(function () {
            return editSettingsDialog.memoryTextbox(0).clear();
        }).then(function () {
            return editSettingsDialog.memoryTextbox(0).sendKeys(123);
        }).then(function () {
            return racetrack.log("Click save button to save the changes.");
        }).then(function () {
            saveButton = VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return racetrack.log("Verify that error message pops up");
        }).then(function () {
            return expect(editSettingsDialog.clearValidationBannerButton().isDisplayed()).toBe(true);
        }).then(function () {
            return editSettingsDialog.clearValidationBannerButton().click();
        }).then(function(){
            return editSettingsDialog.memoryTextbox(1).clear();
        }).then(function () {
            return racetrack.log("Enter correct RAM size: 124" );
        }).then(function () {
            return editSettingsDialog.memoryTextbox(1).sendKeys(124);
        }).then(function () {
            return racetrack.log("Clear hard disk size textbox");
        }).then(function () {
            hardDiskSlideDown = editSettingsDialog.hardDiskSlideDown;
            return globalUtil.waitForVisibility(hardDiskSlideDown.hardDiskSizeTextbox(0,false));
        }).then(function () {
            return hardDiskSlideDown.hardDiskSizeTextbox(0,false).clear();
        }).then(function () {
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return racetrack.log("Verify that error message pops up");
        }).then(function () {
            return expect(editSettingsDialog.clearValidationBannerButton().isDisplayed()).toBe(true);
        }).then(function () {
            return editSettingsDialog.clearValidationBannerButton().click();
        }).then(function () {
            return racetrack.log("Enter correct hard disk size: 1" );
        }).then(function () {
            return hardDiskSlideDown.hardDiskSizeTextbox(0,true).sendKeys(512);
        }).then(function () {
            return racetrack.log("Click Adapter Slice down");
        }).then(function () {
            networkAdapterSlideDown = editSettingsDialog.networkAdapterSlideDown;
            return globalUtil.waitForVisibility(networkAdapterSlideDown.self(0));
        }).then(function () {
            return networkAdapterSlideDown.self(0).click();
        }).then(function () {
            return racetrack.log("Select manual Mac address.");
        }).then(function () {
            return globalUtil.waitForVisibility(networkAdapterSlideDown.macAddressTypeDropDown.self(0));
        }).then(function () {
            return networkAdapterSlideDown.macAddressTypeDropDown.self(0).click();
        }).then(function () {
            return globalUtil.waitForVisibility(networkAdapterSlideDown.macAddressTypeDropDown.macAddressType(1));
        }).then(function () {
            return networkAdapterSlideDown.macAddressTypeDropDown.macAddressType(1).click();
        }).then(function () {
            return racetrack.log("Enter a wrong Mac address.");
        }).then(function () {
            return networkAdapterSlideDown.macAddressTextBox().sendKeys("aa");
        }).then(function () {
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return racetrack.log("Verify that error message pops up");
        }).then(function () {
            return expect(editSettingsDialog.clearValidationBannerButton().isDisplayed()).toBe(true);
        }).then(function () {
            return editSettingsDialog.cancelSettingsButton().click();
        });
    });


});




