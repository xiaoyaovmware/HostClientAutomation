'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var StoragePage = require('../../../../login/esxUI/storage/storagePage.js');
var StorageUtil = require('../../../../login/esxUI/storage/storageUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Create Non-ASCII named VMFS with custom partition', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        globalUtil = new GlobalUtil(),
        storageUtil = new StorageUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                  Create Non-ascii named VMFS with custom partition                      ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Create Non-ascii named VMFS with custom partition', 'Storage', 'Create Non-ascii named VMFS with custom partition', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Create_Non-ascii_named_VMFS_with_custom_partition_Start');
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
            return globalUtil.waitForVisibility(StoragePage.datastoresTab.self());
         });

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Create_Non-ascii_named_VMFS_with_custom_partition_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Create a Non-ASCII named VMFS with custom partition', function () {

        var datastoreName = globalUtil.getTimeStamp();

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log("Add a new non-ASCII datastore with custom partition: " + datastoreName);
        }).then(function () {
            return globalUtil.waitForVisibility(StoragePage.datastoresTab.refreshButton());
        }).then(function () {
            return StoragePage.datastoresTab.refreshButton().click();
        }).then(function () {
            var ssd = browser.params.missingMsg.diskTypeSSD;
            return storageUtil.addVmfsDatastore(StoragePage, EsxuiPage, datastoreName, ssd, false);
        }).then(function () {
            return racetrack.log("Verify that new non-ASCII datastore is created successfully.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Create Vmfs Datastore', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        }).then(function () {
            return storageUtil.deleteDatastoreByName(StoragePage, datastoreName);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_STORAGE_DELETE);
        })
    })

});
