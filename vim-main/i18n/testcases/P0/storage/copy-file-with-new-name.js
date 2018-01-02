'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var StoragePage = require('../../../../login/esxUI/storage/storagePage.js');
var StorageUtil = require('../../../../login/esxUI/storage/storageUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Copy File With non-ASCII Name', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        storageUtil = new StorageUtil,
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName;

    beforeEach(function () {


        console.log("-----------------------------------------------------------------------------------------");
        console.log("                           Copy File With non-ASCII Name                                 ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();


        return racetrack.testCaseBegin('Copy File With non-ASCII Name', 'Storage', 'Copy File With non-ASCII Name', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Copy_File_With_non-ASCII_Name');
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
        return globalUtil.verifyResult('Copy_File_With_non-ASCII_Name',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Copy File With non-ASCII Name', function () {

        var newFileName = globalUtil.getTimeStamp();

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
            return racetrack.log("Click on Datastore Browser button");
        }).then(function () {
            return globalUtil.waitForVisibility(StoragePage.datastoresTab.datastoreBrowserButton());
        }).then(function () {
            return StoragePage.datastoresTab.datastoreBrowserButton().click();
        }).then(function () {
            return storageUtil.copyFile(StoragePage, vmName, vmName, 'vmx', newFileName);
        }).then(function () {
            return racetrack.log("Verify that new file with non-ASCII name has been copied");
        }).then(function () {
            return expect(StoragePage.datastoresTab.datastoreBrowser.getFileByName(newFileName, 'vmx').isPresent()).toBe(true);
        }).then(function () {
            return racetrack.log("Close the dialog and verify recent task");
        }).then(function () {
            return StoragePage.popUpDialog.okButton(0).click();
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Copy Datastore File', 'None', browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Delete the file folder of the created VM");
        }).then(function () {
            return StoragePage.datastoresTab.datastoreBrowserButton().click();
        }).then(function () {
            return storageUtil.deleteFolderInDatastore(StoragePage, vmName)
        })
    });

});

