'use strict';

var GlobalUtil = require('../../../common/globalUtil.js');
var Timeout = require('../../../common/timeout.js');
var Racetrack = require('../../../common/racetrack.js');
var EsxuiUtil = require('../../../login/esxUI/esxuiUtil.js');

var StorageUtil = function () {

    var globalUtil = new GlobalUtil();
    var racetrack = new Racetrack();
    var esxuiUtil = new EsxuiUtil();
    var self = this;

    this.addVmfsDatastore = function (StoragePage, EsxuiPage, datastoreName, diskType, fulldiskPartition) {

        var newDatastoreWizard = StoragePage.datastoresTab.newDatastoreButton.newDatastoreWizard;
        return globalUtil.waitForVisibility(StoragePage.datastoresTab.newDatastoreButton.self()).then(function () {
            return StoragePage.datastoresTab.newDatastoreButton.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.createNewVMFSdatastore());
        }).then(function () {
            return racetrack.log("- - Select Create new VMFS datastore and click next button.");
        }).then(function () {
            return newDatastoreWizard.createNewVMFSdatastore().click();
        }).then(function () {
            return newDatastoreWizard.nextButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.getDiskRowByType(diskType));
        }).then(function () {
            return newDatastoreWizard.getDiskRowByType(diskType).click();
        }).then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.datastoreNameTextbox());
        }).then(function () {
            return racetrack.log("- - Enter non-ASCII datastore name: " + datastoreName + " and click Next button");
        }).then(function () {
            return newDatastoreWizard.datastoreNameTextbox().sendKeys(datastoreName);
        }).then(function () {
            return newDatastoreWizard.nextButton().click();
        }).then(function () {
            return newDatastoreWizard.selectPartitionSchemeDropDown.self().click();
        }).then(function () {
            if (fulldiskPartition){
                return self.addDatastoreFullDisk(StoragePage,newDatastoreWizard);
            }else {
                return self.addDatastoreCustomizePartition(StoragePage,newDatastoreWizard);
            }
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_STORAGE_ACTION);
        })

    };

    this.addDatastoreCustomizePartition = function(StoragePage,newDatastoreWizard){

        return racetrack.log("- - Select custimize partitioning scheme.").then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.selectPartitionSchemeDropDown.customPartitionMenu());
        }).then(function () {
            return newDatastoreWizard.selectPartitionSchemeDropDown.customPartitionMenu().click();
        }).then(function () {
            return racetrack.log("- - Select a partition.");
        }).then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.getPartition());
        }).then(function () {
            return newDatastoreWizard.getPartition().click();
        }).then(function () {
            return racetrack.log("- - Enter a customized partition size.");
        }).then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.partitionSizeTextbox());
        }).then(function () {
            return newDatastoreWizard.partitionSizeTextbox().clear();
        }).then(function () {
            return newDatastoreWizard.partitionSizeTextbox().sendKeys("3000");
            //}).then(function () {
            //    return racetrack.log("- - Drag a customized partition size.");
            // }).then(function () {
            //     return globalUtil.waitForVisibility(newDatastoreWizard.customPartitionDraghandle());
            // }).then(function () {
            //     return browser.actions().dragAndDrop(newDatastoreWizard.customPartitionDraghandle(), {x: 60, y: 0}).perform();
        }).then(function () {
            return newDatastoreWizard.nextButton().click();
        }).then(function () {
            return racetrack.log("- - Click Finish to add non-ASCII datastore.");
        // }).then(function () {
        //     return globalUtil.waitForVisibility(newDatastoreWizard.dataStoreTypeLable());
        }).then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.finishButton());
        }).then(function () {
            return newDatastoreWizard.finishButton().click();
        });

    };

    this.addDatastoreFullDisk = function(StoragePage,newDatastoreWizard){

        var yesButton;

        return racetrack.log("- - Select Full disk scheme").then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.selectPartitionSchemeDropDown.fullDiskMenu());
        }).then(function () {
            return newDatastoreWizard.selectPartitionSchemeDropDown.fullDiskMenu().click();
        }).then(function () {
            return newDatastoreWizard.nextButton().click();
        }).then(function () {
            return racetrack.log("- - Click Finish to add non-ASCII datastore.");
        // }).then(function () {
        //     return globalUtil.waitForVisibility(newDatastoreWizard.dataStoreNameLable());
        }).then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.finishButton());
        }).then(function () {
            return newDatastoreWizard.finishButton().click();
        }).then(function () {
            yesButton = StoragePage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(yesButton);
        }).then(function () {
            return yesButton.click();
        });

    };

    this.addNfsDatastore = function (StoragePage, EsxuiPage, datastoreName, nfsServer, nfsShare) {

        var newDatastoreWizard = StoragePage.datastoresTab.newDatastoreButton.newDatastoreWizard,
            yesButton;

        return globalUtil.waitForVisibility(StoragePage.datastoresTab.newDatastoreButton.self()).then(function () {
            return StoragePage.datastoresTab.newDatastoreButton.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.createNewVMFSdatastore());
        }).then(function () {
            return racetrack.log("- - Select Create new NFS datastore and click next button.");
        }).then(function () {
            return newDatastoreWizard.createNewNfsDatastore().click();
        }).then(function () {
            return newDatastoreWizard.nextButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.nfsDatastoreName());
        }).then(function () {
            return racetrack.log("- - Enter non-ASCII datastore name: " + datastoreName);
        }).then(function () {
            return newDatastoreWizard.nfsDatastoreName().sendKeys(datastoreName);
        }).then(function () {
            return racetrack.log("- - Enter NFS server: " + nfsServer);
        }).then(function () {
            return newDatastoreWizard.nfsHost().sendKeys(nfsServer);
        }).then(function () {
            return racetrack.log("- - Enter NFS share: " + nfsShare);
        }).then(function () {
            return newDatastoreWizard.nfsShare().sendKeys(nfsShare);
        }).then(function () {
            return newDatastoreWizard.nextButton().click();
        }).then(function () {
            return racetrack.log("- - Click Finish to add non-ASCII datastore.");
        }).then(function () {
            //return globalUtil.waitForVisibility(newDatastoreWizard.dataStoreTypeLable());
            return globalUtil.waitForVisibility(newDatastoreWizard.NFSversionLable());   //modify
        }).then(function () {
            return globalUtil.waitForVisibility(newDatastoreWizard.finishButton());
        }).then(function () {
            return newDatastoreWizard.finishButton().click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_STORAGE_ACTION);
        })

    };

    this.deleteDatastoreByRowNum = function (StoragePage,rowNum) {

        var dataStoreGrid = StoragePage.datastoresTab.dataStoreGrid,
            deleteButton;

        return globalUtil.waitForVisibility(dataStoreGrid.getDatastoreByRowNum(rowNum)).then(function (){
            return browser.actions().mouseMove(dataStoreGrid.getDatastoreByRowNum(rowNum)).perform();
        }).then(function () {
            return dataStoreGrid.getDatastoreNameByRowNum(rowNum).getText();
        }).then(function (datastoreName) {
            return racetrack.log("- - Right-click datastore: " + datastoreName);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return globalUtil.waitForVisibility(dataStoreGrid.rightClickContextMenu.deleteMenu());
        }).then(function () {
            return racetrack.log("- - Select delete and confirm delete.");
        }).then(function () {
            return dataStoreGrid.rightClickContextMenu.deleteMenu().click();
        }).then(function () {
            deleteButton = StoragePage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(deleteButton);
        }).then(function () {
            return deleteButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_STORAGE_ACTION);
        })

    };

    this.deleteDatastoreByName = function (StoragePage,datastoreName) {

        var dataStoreGrid = StoragePage.datastoresTab.dataStoreGrid,
            deleteButton;

        return globalUtil.waitForVisibility(dataStoreGrid.resizableIcon()).then(function () {
            return browser.actions().doubleClick(dataStoreGrid.resizableIcon()).perform();
        }).then(function (){
            return globalUtil.waitForVisibility(dataStoreGrid.getDatastoreByName(datastoreName));
        }).then(function () {
            return browser.actions().mouseMove(dataStoreGrid.getDatastoreByName(datastoreName)).perform();
        }).then(function () {
            return racetrack.log("- - Right-click datastore: " + datastoreName);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return globalUtil.waitForVisibility(dataStoreGrid.rightClickContextMenu.deleteMenu());
        }).then(function () {
            return racetrack.log("- - Select delete and confirm delete.");
        }).then(function () {
            return dataStoreGrid.rightClickContextMenu.deleteMenu().click();
        }).then(function () {
            deleteButton = StoragePage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(deleteButton);
        }).then(function () {
            return deleteButton.click();
        })

    };

    this.registerVM = function (StoragePage, EsxuiPage, vmName) {

        var datastoreBrowser = StoragePage.datastoresTab.datastoreBrowser,
            registerButton;

        return globalUtil.waitForVisibility(datastoreBrowser.datastoreBrowserFolder0(0)).then(function(){
            return racetrack.log("- - Click the VM folder: " + vmName);
        }).then(function(){
            return browser.executeScript('arguments[0].scrollIntoView()', datastoreBrowser.getFolderByName(vmName).getWebElement());
        }).then(function(){
            return datastoreBrowser.getFolderByName(vmName).click();
        }).then(function(){
            return globalUtil.waitForVisibility(datastoreBrowser.datastoreBrowserFolder1(0));
        }).then(function(){
            return racetrack.log("- - Click the .vmx file.");
        }).then(function(){
            return datastoreBrowser.getFileByName(vmName,'vmx').click();
        }).then(function(){
            return racetrack.log("- - Click Register button to register the VM.");
        }).then(function(){
            registerButton = StoragePage.popUpDialog.okButton(0);
            return registerButton.click();
        });

    };

    this.cancelRegisterVM = function (StoragePage,vmName) {

        var datastoreBrowser = StoragePage.datastoresTab.datastoreBrowser,
            cancelRegisterButton;

        return globalUtil.waitForVisibility(datastoreBrowser.datastoreBrowserFolder0(0)).then(function(){
            return racetrack.log("- - Click the VM folder: " + vmName);
        }).then(function(){
            return datastoreBrowser.getFolderByName(vmName).click();
        }).then(function(){
            return globalUtil.waitForVisibility(datastoreBrowser.datastoreBrowserFolder1(0));
        }).then(function(){
            return racetrack.log("- - Click the .vmx file.");
        }).then(function(){
            return datastoreBrowser.getFileByName(vmName,'vmx').click();
        }).then(function(){
            return racetrack.log("- - Click Cancel button to unregister the VM.");
        }).then(function(){
            cancelRegisterButton = StoragePage.popUpDialog.cancelButton(0);
            return cancelRegisterButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_RESISTER_ACTION);
        });

    };

    this.deleteFolderInDatastore = function (StoragePage, vmName) {

        var datastoreBrowser = StoragePage.datastoresTab.datastoreBrowser,
            confirmButton, closeButton;

        return globalUtil.waitForVisibility(datastoreBrowser.datastoreBrowserFolder0(0)).then(function(){
            return racetrack.log("- - Select the VM folder: " + vmName);
        }).then(function () {
            return datastoreBrowser.getFolderByName(vmName).click();
        }).then(function () {
            return globalUtil.waitForVisibility(datastoreBrowser.datastoreBrowserFolder1(0));
        }).then(function(){
            return racetrack.log("- - Click Delete button.");
        }).then(function () {
            return datastoreBrowser.deleteButton().click();
        }).then(function(){
            return racetrack.log("- - Click Confirm to delete the VM folder.");
        }).then(function () {
            confirmButton = StoragePage.popUpDialog.okButton(1);
            return globalUtil.waitForVisibility(confirmButton);
        }).then(function () {
            return confirmButton.click();
        }).then(function () {
            return browser.sleep(2000);
        }).then(function () {
            closeButton = StoragePage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(closeButton);
        }).then(function () {
            return closeButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_STORAGE_ACTION);
        })

    };

    this.createFolderInDatastore = function (StoragePage, folderName) {

        var datastoreBrowser = StoragePage.datastoresTab.datastoreBrowser,
            createButton;

        // return globalUtil.waitForVisibility(datastoreBrowser.datastoreBrowserFolder0(0)).then(function () {
        //     return racetrack.log("- - Click on Create Directory button.");
        // }, function (error) {
        //     console.log("createFolderInDatastore error:" + error);
        //     return datastoreBrowser.refreshButton().click();

        return datastoreBrowser.datastoreBrowserFolder0(0).isPresent().then(function (present) {
            if (present){
                return browser.sleep(2000);
            } else{
                return datastoreBrowser.refreshButton().click().then(function () {
                    return browser.sleep(2000);
                })
            }
        }).then(function () {
            return datastoreBrowser.createDirectoryButton().click();
        }).then(function(){
            return racetrack.log("- - Enter non-ASCII folder name.");
        }).then(function () {
            return globalUtil.waitForVisibility(datastoreBrowser.newDirectoryDialoag.nameTextBox());
        }).then(function () {
            return datastoreBrowser.newDirectoryDialoag.nameTextBox().sendKeys(folderName);
        }).then(function(){
            return racetrack.log("- - Click on create button to create the folder.");
        }).then(function () {
            createButton = StoragePage.popUpDialog.okButton(1);
            return globalUtil.waitForVisibility(createButton);
        }).then(function () {
            return createButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_STORAGE_ACTION);
        });

    };

    this.moveFolderInDatastore = function(StoragePage, sourceFolder, destinationFolder){

        var datastoreBrowser = StoragePage.datastoresTab.datastoreBrowser,
            moveButton;

        return globalUtil.waitForVisibility(datastoreBrowser.datastoreBrowserFolder0(0)).then(function () {
            return racetrack.log("- - Select the non-ASCII VM folder and click Move button.");
        }).then(function () {
            return sourceFolder.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_REFRESH);
        }).then(function () {
            return globalUtil.waitForVisibility(datastoreBrowser.moveButton());
        }).then(function () {
            return datastoreBrowser.moveButton().click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_REFRESH);
        }).then(function(){
            return racetrack.log("- - Enter the folder name: "+ destinationFolder);
        }).then(function () {
            return globalUtil.waitForVisibility(datastoreBrowser.datastoreBrowserFolder0(1));
        }).then(function () {
            return globalUtil.waitForVisibility(datastoreBrowser.fileNameField());
        }).then(function () {
            return datastoreBrowser.fileNameField().sendKeys(destinationFolder + '/');
        }).then(function(){
            return racetrack.log("- - Click Move button to move the folder.");
        }).then(function () {
            moveButton = StoragePage.popUpDialog.okButton(1);
            return globalUtil.waitForVisibility(moveButton);
        }).then(function () {
            return moveButton.click()
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_STORAGE_ACTION);
        });
    };

    this.clearPartitionTableByDeviceRowNum = function (StoragePage, EsxuiPage, rowNum) {

        var deviceGrid = StoragePage.devicesTab.deviceGrid,
            actionsMenu = StoragePage.devicesTab.actionsButton,
            yesButton;

        return globalUtil.waitForVisibility(deviceGrid.getDeviceByRowNum(rowNum)).then(function (){
            return deviceGrid.getDeviceByRowNum(rowNum).click();
        }).then(function () {
            return racetrack.log("- - Select the device and click Actions button");
        }).then(function () {
            return globalUtil.waitForVisibility(actionsMenu.self());
        }).then(function () {
            return actionsMenu.self().click();
        }).then(function () {
            return racetrack.log("- - Select Clear Partition Table menu.");
        }).then(function () {
            return globalUtil.waitForVisibility(actionsMenu.clearPartitionTable());
        }).then(function () {
            return actionsMenu.clearPartitionTable().click();
        }).then(function () {
            yesButton = StoragePage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(yesButton);
        }).then(function () {
            return yesButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_STORAGE_ACTION);
        })

    };

    this.removePartition = function (StoragePage, EsxuiPage) {

        var actionsMenu = StoragePage.devicesTab.actionsButton,
            editPartitionsDialog, okButton, yesButton;

        return globalUtil.waitForVisibility(actionsMenu.self()).then(function () {
            return actionsMenu.self().click();
        }).then(function () {
            return racetrack.log("- - Select Edit Partitions menu.");
        }).then(function () {
            return globalUtil.waitForVisibility(actionsMenu.editPartitions.self());
        }).then(function () {
            return actionsMenu.editPartitions.self().click();
        }).then(function () {
            return racetrack.log("- - Select a partition.");
        }).then(function () {
            editPartitionsDialog = StoragePage.devicesTab.actionsButton.editPartitions.editPartitionsDialog;
            return globalUtil.waitForVisibility(editPartitionsDialog.getPartition());
        }).then(function () {
            return editPartitionsDialog.getPartition().click();
        }).then(function () {
            return racetrack.log("- - Click Delete Partition button");
        }).then(function () {
            return globalUtil.waitForVisibility(editPartitionsDialog.deletePartitionButton());
        }).then(function () {
            return editPartitionsDialog.deletePartitionButton().click();
        }).then(function () {
            return browser.sleep(5000);
        }).then(function () {
            return racetrack.log("- - Click Save partitions to save the changes.");
        }).then(function () {
            okButton = StoragePage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(okButton);
        }).then(function () {
            return okButton.click();
        }).then(function () {
            yesButton = StoragePage.popUpDialog.okButton(1);
            return globalUtil.waitForVisibility(yesButton);
        }).then(function () {
            return yesButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_STORAGE_ACTION);
        })

    };

    this.copyFile = function (StoragePage, folderName, fileName, fileType, newFileName) {
        var datastoreBrowser = StoragePage.datastoresTab.datastoreBrowser,
            newFileFullName = newFileName + '.' + fileType;

        return globalUtil.waitForVisibility(datastoreBrowser.self()).then(function () {
            return racetrack.log("- -Select the non-ASCII VM folder -> .vmx file and click Copy button.");
        }).then(function () {
            return datastoreBrowser.getFolderByName(folderName).click();
        }).then(function () {
            return globalUtil.waitForVisibility(datastoreBrowser.getFileByName(fileName, fileType));
        }).then(function () {
            return datastoreBrowser.getFileByName(fileName, fileType).click();
        }).then(function () {
            return datastoreBrowser.copyButton().click();
        }).then(function () {
            return racetrack.log("- -Select the destination folder: " + folderName);
        }).then(function () {
            return globalUtil.waitForVisibility(datastoreBrowser.selectDestinationDialog.self())
        }).then(function () {
            return datastoreBrowser.selectDestinationDialog.getFolderByName(folderName).click();
        }).then(function () {
            return racetrack.log("- -Input new file name: " + newFileName);
        }).then(function () {
            return datastoreBrowser.selectDestinationDialog.fileNameField().sendKeys(newFileFullName);
        }).then(function () {
            return racetrack.log("- -Click copy button.");
        }).then(function () {
            return StoragePage.popUpDialog.okButton(1).click()
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_STORAGE_ACTION);
        })
    };
};

module.exports = StorageUtil;
