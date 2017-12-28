'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var StoragePage = require('../../../../login/esxUI/storage/storagePage.js');
var StorageUtil = require('../../../../login/esxUI/storage/storageUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Clear partition table in non-ASCII environment', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        globalUtil = new GlobalUtil(),
        storageUtil = new StorageUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                     Clear partition table in non-ASCII environment                      ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Clear partition table in non-ASCII environment', 'Storage', 'Clear partition table in non-ASCII environment', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Clear_partition_table_in_non-ASCII_environment_Start');
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
        });

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Clear_partition_table_in_non-ASCII_environment_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Clear partition table in non-ASCII environment', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return esxuiUtil.getHostName();
        }).then(function(name) {
            hostName = name;
            return racetrack.log("Go to Storage > devices tab.");
        }).then(function() {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.storageMenu());
        }).then(function() {
            return EsxuiPage.navigator.storageMenu().click();
        }).then(function() {
            return globalUtil.waitForVisibility(StoragePage.devicesTab.self());
        }).then(function() {
            return StoragePage.devicesTab.self().click();
        }).then(function () {
            return racetrack.log("Clear a partition table for a device in non-ASCII environment.");
        }).then(function () {
            return storageUtil.clearPartitionTableByDeviceRowNum(StoragePage, EsxuiPage, 2);
        }).then(function () {
            return racetrack.log("Verify that the partition table is cleared successfully.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Disk Partitions', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })
    })

});
