'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var StoragePage = require('../../../../login/esxUI/storage/storagePage.js');
var StorageUtil = require('../../../../login/esxUI/storage/storageUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Create Non-ASCII named VMFS with full disk', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        globalUtil = new GlobalUtil(),
        storageUtil = new StorageUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                  Create Non-ascii named VMFS with full disk                             ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Create Non-ascii named VMFS with full disk', 'Storage', 'Create Non-ascii named VMFS with full disk', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Create_Non-ASCII_named_VMFS_with_full_disk_Start');
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
        }).then(function() {
            return esxuiUtil.getHostName();
        }).then(function (name) {
            hostName = name;
            return racetrack.log("Go to Storage > datastore tab.");
        }).then(function() {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.storageMenu());
        }).then(function() {
            return EsxuiPage.navigator.storageMenu().click();
        }).then(function() {
            return globalUtil.waitForVisibility(StoragePage.datastoresTab.dataStoreGrid.resizableIcon());
        }).then(function() {
            return browser.actions().doubleClick(StoragePage.datastoresTab.dataStoreGrid.resizableIcon()).perform();
        // }).then(function() {
        //     return racetrack.log("Delete a existing datastore.");
        // }).then(function() {
        //     return StoragePage.datastoresTab.dataStoreGrid.getDatastoreNameByDiskType('SSD').getText();
        // }).then(function (datastoreName) {
        //     return storageUtil.deleteDatastoreByName(StoragePage, datastoreName);
        });

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Create_Non-ASCII_named_VMFS_with_full_disk_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Create a Non-ASCII named VMFS with full disk', function () {

        var datastoreName = globalUtil.getTimeStamp();

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log("Add a new non-ASCII datastore with full disk: " + datastoreName);
        }).then(function () {
            var ssd = browser.params.missingMsg.diskTypeSSD;
            return storageUtil.addVmfsDatastore(StoragePage, EsxuiPage, datastoreName, ssd, true);
        }).then(function () {
            return racetrack.log("Verify that new non-ASCII datastore is created successfully.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Create Vmfs Datastore', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })
    })

});
