'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var StoragePage = require('../../../../login/esxUI/storage/storagePage.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Register vm state', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                 Register vm state                                       ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Register vm state', 'Register VM', 'Register vm state', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Register_vm_state_Start');
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
        }).then(function() {
            return racetrack.log("Unregister the non-ASCII VM");
        }).then(function() {
            return vmUtil.unregisterVMByName(VMPage, EsxuiPage, vmName);
        })
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Register_vm_state_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Check Register VM state in non-ASCII environment', function () {
        var datastoreBrowser, registerButton;

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Click on Storage menu > Datastore tab");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.storageMenu());
        }).then(function () {
            return EsxuiPage.navigator.storageMenu().click();
        }).then(function () {
            return globalUtil.waitForVisibility(StoragePage.datastoresTab.self());
        }).then(function () {
            return StoragePage.datastoresTab.self().click();
        }).then(function () {
            return racetrack.log("Click on Register VM button");
        }).then(function () {
            return globalUtil.waitForVisibility(StoragePage.datastoresTab.registerVMButton());
        }).then(function () {
            return StoragePage.datastoresTab.registerVMButton().click();
        }).then(function () {
            datastoreBrowser = StoragePage.datastoresTab.datastoreBrowser;
            return globalUtil.waitForVisibility(datastoreBrowser.datastoreBrowserFolder0(0));
        }).then(function () {
            return racetrack.log("Click the VM folder: " + vmName);
        }).then(function(){
            return browser.executeScript('arguments[0].scrollIntoView()', datastoreBrowser.getFolderByName(vmName).getWebElement());
        }).then(function () {
            return datastoreBrowser.getFolderByName(vmName).click();
        }).then(function(){
            return racetrack.log("- - Click the .vmx file and verify that Register button is enabled.");
        }).then(function () {
            return globalUtil.waitForVisibility(datastoreBrowser.datastoreBrowserFolder1(0))
        }).then(function () {
            return datastoreBrowser.getFileByName(vmName,'vmx').click();
        }).then(function () {
            registerButton = StoragePage.popUpDialog.okButton(0);
            return registerButton.getAttribute('disabled');
        }).then(function (attr) {
            //console.log('attr:' + attr);
            return expect(attr).toBe(null);
        }).then(function(){
            return racetrack.log("- - Click the .vmsd file and verify that Register button is disabled.");
        }).then(function () {
            return datastoreBrowser.getFileByName(vmName,'vmsd').getAttribute('class');
        }).then(function (attr) {
            //console.log('attr:' + attr);
            //return expect(attr).toBe('ng-binding ng-scope disabled');
            return expect(attr).toContain('disabled');
        });
    });
});