'use strict';

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Enter and exit maintenance mode', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        racetrack = new Racetrack(),
        globalUtil = new GlobalUtil(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName, hostName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("           Enter and exit maintenance mode power on vm exist                             ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Enter and exit maintenance mode power on vm exist', 'Services', 'Enter and exit maintenance mode power on vm exist', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Enter_and_exit_maintenance_mode_power_on_vm_exist_Start');
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
        }).then(function(){
            return racetrack.log("Click Virtual Machines in esx UI");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.vmMenu.self());
        }).then(function(){
            return EsxuiPage.navigator.vmMenu.self().click();
        }).then(function(){
            vmName = globalUtil.getTimeStamp();
            return racetrack.log("Create a new non-ASCII VM with default settings: " + vmName);
        }).then(function(){
            return vmUtil.createVMWithDefaultSettings(VMPage, vmName, EsxuiPage);
        }).then(function(){
            return racetrack.log("Power on the non-ASCII VM");
        }).then(function () {
            return vmUtil.powerOnVMFromGridByName(VMPage,vmName);
        }).then(function () {
            return racetrack.log("Verify that VM is powered on");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Power On VM', vmName, browser.params.taskMsg.task.state.success,3);
        })
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Enter_and_exit_maintenance_mode_power_on_vm_exist_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Enter and exit maintenance mode power on vm exist', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log("Click Host in esx UI");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function(){
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function(){
            return esxuiUtil.getHostName();
        }).then(function (host) {
            hostName = host;
            return racetrack.log("Enter maintenance mode");
        }).then(function(){
            return esxuiUtil.enterMaintenanceModedelayed(EsxuiPage);
        }).then(function () {
            return racetrack.log("Click Virtual Machines in esx UI");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.vmMenu.self());
        }).then(function(){
            return EsxuiPage.navigator.vmMenu.self().click();
        }).then(function(){
            return racetrack.log("Power off the non-ASCII VM");
        }).then(function () {
            return vmUtil.powerOffVMFromGridByName(VMPage,vmName);
        }).then(function () {
            return racetrack.log("Verify that VM is powered off");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Power Off VM', vmName, browser.params.taskMsg.task.state.success,3);
        }).then(function(){
            return racetrack.log("Verify that host enter maintenance mode in non-ASCII environment.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Enter Maintenance Mode', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Click Host in esx UI");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function(){
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function(){
            return esxuiUtil.getHostName();
        }).then(function (host) {
            return racetrack.log("Exit maintenance mode");
        }).then(function(){
            return esxuiUtil.exitMaintenanceMode(EsxuiPage);
        }).then(function () {
            return racetrack.log("Verify that host exit maintenance mode in non-ASCII environment.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Exit Maintenance Mode', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        }).then(function () {
            return racetrack.log("Click Virtual Machines in esx UI");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.vmMenu.self());
        }).then(function(){
            return EsxuiPage.navigator.vmMenu.self().click();
        }).then(function () {
            return vmUtil.deleteVMFromGridByName(VMPage,vmName);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_DELETE);
        })
    });

});
