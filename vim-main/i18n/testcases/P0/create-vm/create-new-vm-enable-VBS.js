'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var Timeout = require('../../../../common/timeout.js');
var GlobalUtil = require('../../../../common/globalUtil.js');

var Racetrack = require('../../../../common/racetrack.js');

describe('Create New non-ASCII VM enable VBS', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                             Create New VM enable VBS                                    ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Create New non-ASCII VM enable VBS','Create VM','Create New non-ASCII VM enable VBS',browser.params.i18n.lang,'','','UI','P0','Automation').then(function() {
            return globalUtil.takeScreenshot(screenshotSavePath, 'Create_New_non-ASCII_VM_enable_VBS_Start');
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
        return globalUtil.verifyResult('Create_New_non-ASCII_VM_enable_VBS_Stop', screenshotSavePath).then(function(){
            done();
        });
    });

    it('Create New non-ASCII VM enable VBS and verify', function () {
        var vmName = globalUtil.getTimeStamp();
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
            return racetrack.log("Create a new non-ASCII VM with VBS enabled: " + vmName);
        }).then(function(){
            var newVMWizard = VMPage.createRegisterVMButton.newVMWizard;
            var windows = browser.params.vmMsg.vm.wizard.basics.osVersion.windowsGuest;
            return vmUtil.createVMenableVBS(newVMWizard, EsxuiPage, vmName, windows, 'Windows 10 64', 512, 8, 'Customize Provisioning', 0, 'thin');
        }).then(function () {
            // Wait for tasks to appear in recent tasks
            return browser.sleep(Timeout.WAIT_FOR_VM_CREATE);
        }).then(function () {
            // Check recent task for create VM task
            return racetrack.log("Verify that new non-ASCII vm with VBS enabled is created successfully.");
        }).then(function(){
            var vmGrid = VMPage.vmGrid;
            return esxuiUtil.checkForRecentTask('Create VM', vmName, browser.params.taskMsg.task.state.success, 3);   //modify
        }).then(function () {
            return vmUtil.deleteVMFromGridByName(VMPage, vmName);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_DELETE);
        })

    });


});
