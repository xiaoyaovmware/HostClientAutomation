'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');
var LoginPage = require('../../../../login/loginPage.js');


var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var StoragePage = require('../../../../login/esxUI/storage/storagePage.js');
var StorageUtil = require('../../../../login/esxUI/storage/storageUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Create Negative Directory', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        storageUtil = new StorageUtil,
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                 Create Negative Directory                               ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Create Negative Directory', 'Storage', 'Create Negative Directory', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Create_Negative_Directory');
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
        })
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Create_Negative_Directory',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Create_Negative_Directory', function () {

        var invalidDirectoryLabel = 'asd"';

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
            return racetrack.log("Create a new folder name with special characters: " + invalidDirectoryLabel);
        }).then(function () {
            return storageUtil.createFolderInDatastore(StoragePage, invalidDirectoryLabel);
        }).then(function () {
            return racetrack.log("Verify Invalid Directory Message Info Is Localized");
        }).then(function () {
            return StoragePage.datastoresTab.datastoreBrowser.newDirectoryDialoag.invalidDirectoryMessage().getText();
        }).then(function (invalidDirectoryLabel) {
            return expect(invalidDirectoryLabel).toBe(browser.params.storageMsg.storage.datastore.browser.dialog.directory.invalidDirectory);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })
    });

});