'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var ManagePage = require('../../../../login/esxUI/host/manage/managePage.js');

var LicensingPage = require('../../../../login/esxUI/host/manage/licensing/licensingPage.js');
var LicensingUtil = require('../../../../login/esxUI/host/manage/licensing/licensingUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Assign License Create VM', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        licensingUtil = new LicensingUtil(),
        vmUtil = new VMUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                            Assign License Create VM                                     ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Assign License Create VM', 'Manage', 'Assign License Create VM', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Assign_License_Create_VM_Start');
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
        }).then(function() {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function () {
            return racetrack.log("Go to Manage > Licensing tab");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.manageMenu());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return globalUtil.waitForVisibility(ManagePage.licensingTab());
        }).then(function () {
            return ManagePage.licensingTab().click();
        }).then(function () {
            return racetrack.log("Assign a license to the host");
        }).then(function () {
            return licensingUtil.assignLicense(LicensingPage, EsxuiPage, '0M0J1-CWKE0-78VP9-0KEHP-0413L');  //modify
        }).then(function () {
            return racetrack.log("Check for recent task and verify that license is assigned successfully");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update License', 'None', browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        });

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Assign_License_Create_VM_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Assign License Create VM in non-ASCII environment', function () {
        var vmName = globalUtil.getTimeStamp();

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
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
            return racetrack.log("Create a new non-ASCII VM with 512 MB RAM and 10 MB thin provisioned hard disk: " + vmName);
        }).then(function(){
            var newVMWizard = VMPage.createRegisterVMButton.newVMWizard;
            var windows = browser.params.vmMsg.vm.wizard.basics.osVersion.windowsGuest;
            return vmUtil.createVM(newVMWizard, EsxuiPage, vmName, windows, 'Windows 10 32', 512, 8, 'Customize Provisioning', 0, 'thin');
        }).then(function () {
            // Wait for tasks to appear in recent tasks
            return browser.sleep(Timeout.WAIT_FOR_VM_CREATE);
        }).then(function () {
            // Check recent task for create VM task
            return racetrack.log("Verify that new non-ASCII vm is created successfully.");
        }).then(function(){
            var vmGrid = VMPage.vmGrid;
            return esxuiUtil.checkForRecentTask('Create VM', vmName, browser.params.taskMsg.task.state.success, 3);   //modify
        }).then(function () {
            return vmUtil.deleteVMFromGridByName(VMPage, vmName);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_DELETE);
        });
    });

});
