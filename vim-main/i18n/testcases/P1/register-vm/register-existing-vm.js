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

describe('Register a non-ASCII VM that already registered', function () {


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
        console.log("                    Register a non-ASCII VM that already registered                      ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Register a non-ASCII VM that already registered', 'Register VM', 'Register a non-ASCII VM that already registered', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Register_a_non-ASCII_VM_that_already_registered_Start');
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
        return globalUtil.verifyResult('Register_a_non-ASCII_VM_that_already_registered_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Register a non-ASCII VM that already registered', function () {
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
            return storageUtil.registerVM(StoragePage, EsxuiPage, vmName);
        }).then(function () {
            return racetrack.log("Verifiy that error pops up");
        }).then(function () {
            return expect(StoragePage.popUpDialog.errorImg().isDisplayed()).toBe(true);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });
});