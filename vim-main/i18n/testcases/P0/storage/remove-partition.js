'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var StoragePage = require('../../../../login/esxUI/storage/storagePage.js');
var StorageUtil = require('../../../../login/esxUI/storage/storageUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Remove partition', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        storageUtil = new StorageUtil(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName, deviceGrid, actionsMenu, editPartitionsDialog, freeSpaceSize;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                           Remove partition in partition editor                          ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Remove partition in partition editor ', 'Storage', 'Remove partition in partition editor ', browser.params.i18n.lang, '', '', 'UI', 'P0', 'Automation').then(function () {
            return globalUtil.takeScreenshot(screenshotSavePath, 'Remove_partition_in_partition_editor_Start');
        }).then(function() {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function() {
            return racetrack.log('----------------------------Precondition-------------------------------------------------');
        }).then(function () {
            return loginUtil.go();
        }).then(function () {
            return racetrack.log("Dismiss the CEIP dialog");
        }).then(function () {
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        }).then(function () {
            return esxuiUtil.getHostName();
        }).then(function (name) {
            hostName = name;
            return racetrack.log("Go to Storage > datastore tab.");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.storageMenu());
        }).then(function () {
            return EsxuiPage.navigator.storageMenu().click();
        });

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Remove_partition_in_partition_editor_Stop',screenshotSavePath).then(function () {
            done();
        });
    });

    it('Remove partition in partition editor', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log("Go to Storage > devices tab.");
        }).then(function () {
            return globalUtil.waitForVisibility(StoragePage.devicesTab.self());
        }).then(function () {
            return StoragePage.devicesTab.self().click();
        }).then(function () {
            return racetrack.log("Select a device and click Actions button");
        }).then(function () {
            deviceGrid = StoragePage.devicesTab.deviceGrid;
            return globalUtil.waitForVisibility(deviceGrid.getDeviceByRowNum(0));
        }).then(function () {
            return deviceGrid.getDeviceByRowNum(0).click();
        }).then(function () {
            return racetrack.log("Remove a partition for the device");
        }).then(function () {
            return storageUtil.removePartition(StoragePage,EsxuiPage);
        }).then(function () {
            return racetrack.log("Check Recent task for remove partition and verify changes are saved");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Disk Partitions', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return globalUtil.waitForVisibility(StoragePage.datastoresTab.self());
        }).then(function () {
            return StoragePage.datastoresTab.self().click();
        }).then(function () {
            var datastoreName = globalUtil.getTimeStamp();
            var diskType = browser.params.storageMsg.storage.device.type.disk;
            return storageUtil.addVmfsDatastore(StoragePage, EsxuiPage, datastoreName, diskType, true);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })
    })

});
