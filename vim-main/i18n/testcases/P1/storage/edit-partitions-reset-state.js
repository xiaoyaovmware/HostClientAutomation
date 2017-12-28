'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var StoragePage = require('../../../../login/esxUI/storage/storagePage.js');
var StorageUtil = require('../../../../login/esxUI/storage/storageUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Reset partition', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName, deviceGrid, actionsMenu, editPartitionsDialog, freeSpaceSize;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                           Reset partition in partition editor                           ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Reset partition in partition editor ', 'Storage', 'Reset partition in partition editor ', browser.params.i18n.lang, '', '', 'UI', 'P1', 'Automation').then(function () {
            return globalUtil.takeScreenshot(screenshotSavePath, 'Reset_partition_in_partition_editor_Start');
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
        return globalUtil.verifyResult('Reset_partition_in_partition_editor_Stop',screenshotSavePath).then(function () {
            done();
        });
    });

    it('Reset partition in partition editor', function () {

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
            actionsMenu = StoragePage.devicesTab.actionsButton;
            return globalUtil.waitForVisibility(actionsMenu.self());
        }).then(function () {
            return actionsMenu.self().click();
        }).then(function () {
            return racetrack.log("Select Edit Partitions menu.");
        }).then(function () {
            return globalUtil.waitForVisibility(actionsMenu.editPartitions.self());
        }).then(function () {
            return actionsMenu.editPartitions.self().click();
        }).then(function () {
            return racetrack.log("Delete a partition and verify that free space size is changed.");
        }).then(function () {
            editPartitionsDialog = StoragePage.devicesTab.actionsButton.editPartitions.editPartitionsDialog;
            return globalUtil.waitForVisibility(editPartitionsDialog.freeSpaceSize());
        }).then(function () {
            return editPartitionsDialog.freeSpaceSize().getText();
        }).then(function (size) {
            freeSpaceSize = size;
            return globalUtil.waitForVisibility(editPartitionsDialog.getPartition());
        }).then(function () {
            return editPartitionsDialog.getPartition().click();
        }).then(function () {
            return globalUtil.waitForVisibility(editPartitionsDialog.deletePartitionButton());
        }).then(function () {
            return editPartitionsDialog.deletePartitionButton().click();
        }).then(function () {
            return browser.sleep(5000);
        }).then(function () {
            return expect(editPartitionsDialog.freeSpaceSizeAfter().getText()).not.toEqual(freeSpaceSize);
        }).then(function () {
            return racetrack.log("Click Reset button and verify that partition is restored.");
        }).then(function () {
            return globalUtil.waitForVisibility(editPartitionsDialog.resetButton());
        }).then(function () {
            return editPartitionsDialog.resetButton().click();
        }).then(function () {
            return browser.sleep(5000);
        }).then(function () {
            return expect(editPartitionsDialog.freeSpaceSize().getText()).toEqual(freeSpaceSize);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })
    })

});
