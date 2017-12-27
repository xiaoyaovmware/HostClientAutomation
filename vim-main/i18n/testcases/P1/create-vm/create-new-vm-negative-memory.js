'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var Timeout = require('../../../../common/timeout.js');
var GlobalUtil = require('../../../../common/globalUtil.js');

var Racetrack = require('../../../../common/racetrack.js');

describe('Create New non-ASCII VM Negative Memory', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                             Create New VM Negative Memory                               ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();



        return racetrack.testCaseBegin('Create New non-ASCII VM Negative Memory','Create VM','Create New non-ASCII VM Negative Memory',browser.params.i18n.lang,'','','UI','P0','Automation').then(function() {
            return globalUtil.takeScreenshot(screenshotSavePath, 'Create_New_non-ASCII_VM_Negative_Memory_Start');
        }).then(function() {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function() {
            return racetrack.log('----------------------------------------Precondition----------------------------------------');
        }).then(function(){
            return loginUtil.go();
        }).then(function(){
            return racetrack.log("Dismiss the CEIP dialog");
        }).then(function(){
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        });

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Create_New_non-ASCII_VM_Negative_Memory_Stop', screenshotSavePath).then(function(){
            done();
        });
    });

    it('Create a non-ASCII VM Negative Memory and verify', function () {
       var vmName = globalUtil.getTimeStamp(),
           newVMWizard,
           windows;

       return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function(){
            return racetrack.log("Click Virtual Machines menu.");
       }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.vmMenu.self());
        }).then(function(){
            return EsxuiPage.navigator.vmMenu.self().click();
        }).then(function(){
            return racetrack.log("Click Create/Register VM button");
        }).then(function(){
            return globalUtil.waitForVisibility(VMPage.createRegisterVMButton.self());
        }).then(function(){
            return VMPage.createRegisterVMButton.self().click();
       }).then(function(){
             return racetrack.log("Select Create a new virtual machine and click Next button");
       }).then(function () {
           newVMWizard = VMPage.createRegisterVMButton.newVMWizard;
           return globalUtil.waitForVisibility(newVMWizard.nextButton());
       }).then(function () {
           return newVMWizard.nextButton().click();
       }).then(function () {
           return racetrack.log("Enter Non-ASCII VM name: " + vmName);
       }).then(function () {
           return globalUtil.waitForVisibility(newVMWizard.vmNameTextBox());
       }).then(function () {
           return newVMWizard.vmNameTextBox().sendKeys('');
       }).then(function () {
           return newVMWizard.vmNameTextBox().clear();
       }).then(function () {
           return newVMWizard.vmNameTextBox().sendKeys(vmName);
       }).then(function () {
           return racetrack.log("Select OS from OS family drop down: windows");
       }).then(function () {
           return globalUtil.waitForVisibility(newVMWizard.guestOSFamilyDropDown.self());
       }).then(function () {
           return newVMWizard.guestOSFamilyDropDown.self().click();
       }).then(function () {
           windows = browser.params.vmMsg.vm.wizard.basics.osVersion.windowsGuest;
           return globalUtil.waitForVisibility(newVMWizard.guestOSFamilyDropDown.option(windows));
       }).then(function () {
           return newVMWizard.guestOSFamilyDropDown.option(windows).click();
       }).then(function () {
           return racetrack.log("Select GOS: Windows 10 32");
       }).then(function () {
           return globalUtil.waitForVisibility(newVMWizard.guestOSVersionDropDown.self());
       }).then(function () {
           return newVMWizard.guestOSVersionDropDown.self().click();
       }).then(function () {
           return globalUtil.waitForVisibility(newVMWizard.guestOSVersionDropDown.option('Windows 10 32'));
       }).then(function () {
           return newVMWizard.guestOSVersionDropDown.option('Windows 10 32').click();
       }).then(function () {
           return racetrack.log("Click Next button");
       }).then(function () {
           return globalUtil.waitForVisibility(newVMWizard.nextButton());
       }).then(function () {
           return newVMWizard.nextButton().click();
       }).then(function () {
           return globalUtil.waitForVisibility(newVMWizard.storageDataTable());
       }).then(function () {
           return racetrack.log("Select default value for VM Storage and click Next");
       }).then(function () {
           return globalUtil.waitForVisibility(newVMWizard.nextButton());
       }).then(function () {
           return newVMWizard.nextButton().click();
       }).then(function () {
           return browser.sleep(10000);
       }).then(function () {
           return globalUtil.waitForVisibility(newVMWizard.memoryTextbox(0));
       }).then(function(){
           return newVMWizard.memoryTextbox(0).clear();
       }).then(function () {
           return racetrack.log("Enter negative RAM size: -128 and click Next button" );
       }).then(function () {
           return newVMWizard.memoryTextbox(0).sendKeys(-2048);
       }).then(function () {
           return globalUtil.waitForVisibility(newVMWizard.nextButton());
       }).then(function () {
           return newVMWizard.nextButton().click();
       }).then(function () {
           return racetrack.log("Verify that error message pops up");
       }).then(function () {
           return expect(newVMWizard.clearValidationBannerButton().isDisplayed()).toBe(true);
       }).then(function () {
           return newVMWizard.clearValidationBannerButton().click();
       }).then(function () {
           return newVMWizard.cancelButton().click();
       })

    });


});



