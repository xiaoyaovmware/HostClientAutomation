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

describe('Cancel register VM', function () {


    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        storageUtil = new StorageUtil,
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName, rowsBefore, rowsAfter;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                 Cancel register VM                                      ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Cancel register VM', 'Register VM', 'Cancel register VM', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Cancel_register_VM_Start');
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
        return globalUtil.verifyResult('Cancel_register_VM_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Cancel register non-ASCII VM', function () {
        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            rowsBefore = VMPage.vmGrid.getAllvmRows();
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
            return storageUtil.cancelRegisterVM(StoragePage,vmName);
        }).then(function () {
            return racetrack.log("Verifiy that the non-ASCII VM is not registered");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.vmMenu.self());
        }).then(function () {
            return EsxuiPage.navigator.vmMenu.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.vmGrid.self());
        }).then(function () {
            rowsAfter = VMPage.vmGrid.getAllvmRows();
            return expect(rowsAfter).toBe(rowsBefore);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });
});