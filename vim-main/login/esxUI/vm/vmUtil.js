'use strict';

var Timeout = require('../../../common/timeout.js');
var GlobalUtil = require('../../../common/globalUtil.js');
var Racetrack = require('../../../common/racetrack.js');
var EsxuiUtil = require('../../../login/esxUI/esxuiUtil.js');


var VirtualMachineUtil = function () {
    var globalUtil = new GlobalUtil();
    var racetrack = new Racetrack();
    var esxuiUtil = new EsxuiUtil();
    var self = this;


    this.createVM = function (newVMWizard, EsxuiPage, vmName, guestOSFamily, guestOSVersion, ramSize, hardDiskSize, customSettings, deviceNum, settingsOption1, settingsOption2) {
        //console.log("createVM deviceNumber: " + deviceNum);

        return globalUtil.waitForVisibility(newVMWizard.nextButton()).then(function () {
            return racetrack.log("- - Select Create a new virtual machine and click Next button");
        }).then(function () {
            return newVMWizard.nextButton().click();
        }).then(function () {
            return self.fillVMNamePage(newVMWizard, vmName, guestOSFamily, guestOSVersion);
        }).then(function () {
            return racetrack.log("- - Click Next button");
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.nextButton());
        }).then(function () {
            return newVMWizard.nextButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.storageDataTable());
        }).then(function () {
            return racetrack.log("- - Select default value for VM Storage and click Next");
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.nextButton());
        }).then(function () {
            return newVMWizard.nextButton().click();
        }).then(function () {
            return browser.sleep(10000);
        }).then(function () {
            return self.fillVMCustomHardware(newVMWizard, ramSize, hardDiskSize, customSettings, deviceNum, settingsOption1, settingsOption2);
        }).then(function () {
            return racetrack.log("- - Click Next button");
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.nextButton());
        }).then(function () {
            return newVMWizard.nextButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.vmNameSummary());
        }).then(function () {
            return racetrack.log("- - Click Finish button");
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.finishButton());
        }).then(function () {
            return newVMWizard.finishButton().click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function(){
            // Wait for VM to be created
            return browser.sleep(Timeout.WAIT_FOR_VM_CREATE);
        }).then(function() {
            return globalUtil.waitForVisibility(EsxuiPage.refreshButton());
        }).then(function(){
            return racetrack.log("- - Refresh Browser");
        }).then(function () {
            return globalUtil.refreshBrowser();
        }).then(function(){
            return browser.sleep(Timeout.WAIT_FOR_REFRESH);
            // return globalUtil.waitForVisibility(EsxuiPage.navigator.vmMenu.self());
        })
    };

    this.fillVMNamePage = function (newVMWizard, vmName, guestOSFamily, guestOSVersion) {

        return globalUtil.waitForVisibility(newVMWizard.vmNameTextBox()).then(function(){
            return racetrack.log("- - Enter Non-ASCII VM name: " + vmName);
        }).then(function () {
            return newVMWizard.vmNameTextBox().sendKeys('');
        }).then(function () {
            return newVMWizard.vmNameTextBox().clear();
        }).then(function () {
            return newVMWizard.vmNameTextBox().sendKeys(vmName);
        }).then(function () {
            return racetrack.log("- - Select OS from OS family drop down: " + guestOSFamily);
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.guestOSFamilyDropDown.self());
        }).then(function () {
            return newVMWizard.guestOSFamilyDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.guestOSFamilyDropDown.option(guestOSFamily));
        }).then(function () {
            return newVMWizard.guestOSFamilyDropDown.option(guestOSFamily).click();
        }).then(function () {
            return racetrack.log("- - Select GOS: " + guestOSVersion);
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.guestOSVersionDropDown.self());
        }).then(function () {
            return newVMWizard.guestOSVersionDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.guestOSVersionDropDown.option(guestOSVersion));
        }).then(function () {
            return newVMWizard.guestOSVersionDropDown.option(guestOSVersion).click();
        })
    };

    this.fillVMCustomHardware = function (newVMWizard, ramSize, hardDiskSize, customSettings, deviceNum, settingsOption1, settingsOption2) {

        //console.log("fillVMCustomHardware deviceNumber: " + deviceNum);

        return globalUtil.waitForVisibility(newVMWizard.memoryTextbox(0)).then(function(){
            return newVMWizard.memoryTextbox(0).clear();
        }).then(function () {
            return racetrack.log("- - Enter RAM size: " + ramSize);
        }).then(function () {
            return newVMWizard.memoryTextbox(0).sendKeys(ramSize);
        }).then(function () {
            return racetrack.log("- - Select Hard disk unit: MB");
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.hardDiskSlideDown.hardDiskUnitDropDown.self(0,false));
        }).then(function () {
            return newVMWizard.hardDiskSlideDown.hardDiskUnitDropDown.self(0,false).click();
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.hardDiskSlideDown.hardDiskUnitDropDown.mbOption());
        }).then(function () {
            return newVMWizard.hardDiskSlideDown.hardDiskUnitDropDown.mbOption().click();
        }).then(function () {
            return racetrack.log("- - Enter hard disk size: " + hardDiskSize);
        }).then(function () {
            return globalUtil.waitForVisibility(newVMWizard.hardDiskSlideDown.hardDiskSizeTextbox(0,false));
        }).then(function () {
            return newVMWizard.hardDiskSlideDown.hardDiskSizeTextbox(0,false).sendKeys(hardDiskSize);
        }).then(function () {
            switch(customSettings) {
                case "Customize Provisioning":
                    return self.customizedProvisioning(newVMWizard, deviceNum, settingsOption1);
                    break;
                case "Customize Virtual Device Node":
                    return self.customizedVirtualDevice(newVMWizard, deviceNum, settingsOption1, settingsOption2);
                    break;
                case "Customize Disk Mode":
                    return self.customizedDiskMode(newVMWizard, deviceNum, settingsOption1);
                    break;
                case "Customize SCSI Controller":
                    return self.customizedSCSIController(newVMWizard, deviceNum, settingsOption1, settingsOption2);
                    break;
                case "Customize Adapter":
                    return self.customizedAdapter(newVMWizard, deviceNum, settingsOption1);
                    break;
                case "Add CDROM":
                    return self.addCDROM(newVMWizard, deviceNum, settingsOption1, settingsOption2);
                    break;
                default:
                    return;
            }
        })
    };

    this.customizedProvisioning = function(settingsPage, deviceNum, provisionType) {
        
        var hardDiskSlideDown = settingsPage.hardDiskSlideDown;
        
        return globalUtil.waitForVisibility(hardDiskSlideDown.self(deviceNum)).then(function () {
            return racetrack.log("- - Click Hard Disk drop down");
        }).then(function () {
            return hardDiskSlideDown.self(deviceNum).click();
        }).then(function () {
            return globalUtil.waitForVisibility(hardDiskSlideDown.hardDiskProvisionType(deviceNum, provisionType));
        }).then(function () {
            return racetrack.log("- - Select hard disk provision type: " + provisionType);
        }).then(function () {
            return globalUtil.waitForVisibility(hardDiskSlideDown.hardDiskProvisionType(deviceNum, provisionType));
        }).then(function () {
            return hardDiskSlideDown.hardDiskProvisionType(deviceNum, provisionType).click();
        }).then(function () {
            return browser.sleep(5000);
        })

    };

    this.customizedVirtualDevice = function(settingsPage, deviceNum, controllerType, controllerLocation) {

        var hardDiskSlideDown = settingsPage.hardDiskSlideDown;

        return globalUtil.waitForVisibility(hardDiskSlideDown.self(deviceNum)).then(function () {
            return racetrack.log("- - Click Hard Disk slide down");
        }).then(function () {
            return hardDiskSlideDown.self(deviceNum).click();
        }).then(function () {
            return racetrack.log("- - Select controller type: " + controllerType);
        }).then(function () {
            return browser.executeScript('arguments[0].scrollIntoView()', hardDiskSlideDown.virtualDeviceNodeControllerDropDown.self(deviceNum).getWebElement());
        }).then(function () {
            // return browser.sleep(2000);
            return globalUtil.waitForVisibility(hardDiskSlideDown.virtualDeviceNodeControllerDropDown.self(deviceNum));
        }).then(function () {
            return hardDiskSlideDown.virtualDeviceNodeControllerDropDown.self(deviceNum).click();
        }).then(function () {
            return globalUtil.waitForVisibility(hardDiskSlideDown.virtualDeviceNodeControllerDropDown.controllerType(controllerType));
        }).then(function () {
            return hardDiskSlideDown.virtualDeviceNodeControllerDropDown.controllerType(controllerType).click();
        }).then(function () {
            return racetrack.log("- - Select controller location: " + controllerLocation);
        }).then(function(){
            return globalUtil.waitForVisibility(hardDiskSlideDown.virtualDeviceNodeLocationDropDown.self(deviceNum));
        }).then(function () {
            return hardDiskSlideDown.virtualDeviceNodeLocationDropDown.self(deviceNum).click();
        }).then(function () {
            return globalUtil.waitForVisibility(hardDiskSlideDown.virtualDeviceNodeLocationDropDown.controllerLocation(controllerLocation));
        }).then(function () {
            return hardDiskSlideDown.virtualDeviceNodeLocationDropDown.controllerLocation(controllerLocation).click();
        })

    };

    this.customizedDiskMode = function(settingsPage, deviceNum, diskMode) {
        var hardDiskSlideDown = settingsPage.hardDiskSlideDown;
        
        return globalUtil.waitForVisibility(settingsPage.hardDiskSlideDown.self(deviceNum)).then(function () {
            return racetrack.log("- - Click Hard Disk slide down");
        }).then(function () {
            return settingsPage.hardDiskSlideDown.self(deviceNum).click();
        }).then(function () {
            return globalUtil.waitForVisibility(hardDiskSlideDown.diskModeDropDown.self(deviceNum));
        }).then(function(){
            return racetrack.log("- - Select disk mode: " + diskMode);
        }).then(function(){
            return browser.executeScript('arguments[0].scrollIntoView()', hardDiskSlideDown.diskModeDropDown.self(deviceNum).getWebElement());
        }).then(function () {
            return globalUtil.waitForVisibility(hardDiskSlideDown.diskModeDropDown.self(deviceNum));
        }).then(function () {
            return hardDiskSlideDown.diskModeDropDown.self(deviceNum).click();
        }).then(function () {
            return globalUtil.waitForVisibility(hardDiskSlideDown.diskModeDropDown.diskMode(diskMode));
        }).then(function () {
            return hardDiskSlideDown.diskModeDropDown.diskMode(diskMode).click();
        })

    };

    this.customizedSCSIController = function(settingsPage, deviceNum, scsiControllerType, scsiBusSharingType) {

        //console.log("customizedSCSIController deviceNumber: " + deviceNum);

        var scsiControllerSlideDown = settingsPage.scsiControllerSlideDown;
        
        return globalUtil.waitForVisibility(scsiControllerSlideDown.self(deviceNum)).then(function () {
            return browser.executeScript('arguments[0].scrollIntoView()', scsiControllerSlideDown.self(deviceNum).getWebElement());
        }).then(function () {
            return racetrack.log("- - Click SCSI Controller slide down");
        }).then(function () {
            return scsiControllerSlideDown.self(deviceNum).click();
        }).then(function () {
            return racetrack.log("- - Click SCSI Controller drop down");
        }).then(function () {
            globalUtil.waitForVisibility(scsiControllerSlideDown.scsiControllerDropDown.self(deviceNum, true));
        }).then(function () {
            return scsiControllerSlideDown.scsiControllerDropDown.self(deviceNum, true).click();
        }).then(function () {
            return racetrack.log("- - Select SCSI controler: " + scsiControllerType);
        }).then(function () {
            return globalUtil.waitForVisibility(scsiControllerSlideDown.scsiControllerDropDown.scsiControllerType(scsiControllerType));
        }).then(function () {
            return scsiControllerSlideDown.scsiControllerDropDown.scsiControllerType(scsiControllerType).click();
        }).then(function () {
            return racetrack.log("- - Click SCSI Bus Sharing drop down");
        }).then(function () {
            return globalUtil.waitForVisibility(scsiControllerSlideDown.scsiBusSharingDropDown.self(deviceNum));
        }).then(function () {
            return scsiControllerSlideDown.scsiBusSharingDropDown.self(deviceNum).click();
        }).then(function () {
            return racetrack.log("- - Select Bus Sharing type: " + scsiBusSharingType);
        }).then(function () {
            return globalUtil.waitForVisibility(scsiControllerSlideDown.scsiBusSharingDropDown.scsiBusSharingType(scsiBusSharingType));
        }).then(function () {
            return scsiControllerSlideDown.scsiBusSharingDropDown.scsiBusSharingType(scsiBusSharingType).click();
        })
    };

    this.customizedAdapter = function(settingsPage, deviceNum, adapterType) {

        var networkAdapterSlideDown = settingsPage.networkAdapterSlideDown;
        
        return globalUtil.waitForVisibility(networkAdapterSlideDown.self(deviceNum)).then(function () {
            return racetrack.log("- - Click Network Adapter slide down");
        }).then(function () {
            return networkAdapterSlideDown.self(deviceNum).click();
        }).then(function () {
            return racetrack.log("- - Click Adapter Type drop down");
        }).then(function () {
            return globalUtil.waitForVisibility(networkAdapterSlideDown.adapterTypeDropDown.self(deviceNum));
        }).then(function () {
            return networkAdapterSlideDown.adapterTypeDropDown.self(deviceNum).click();
        }).then(function () {
            return racetrack.log("- - Select Adapter type: " + adapterType);
        }).then(function () {
            return globalUtil.waitForVisibility(networkAdapterSlideDown.adapterTypeDropDown.adapterType(adapterType));
        }).then(function () {
            return networkAdapterSlideDown.adapterTypeDropDown.adapterType(adapterType).click();
        })
    };

    this.addCDROM = function(settingsPage, deviceNum, controllerType, location) {
        //console.log("addCDROM deviceNum:" + deviceNum);
        
        var cdromSlideDown = settingsPage.cdromSlideDown;
        
        return globalUtil.waitForVisibility(settingsPage.addOtherDeviceButton.self()).then(function () {
            return racetrack.log("- - Click Add other device");
        }).then(function () {
            return settingsPage.addOtherDeviceButton.self().click();
        }).then(function () {
            return racetrack.log("- - Click CD/DVD Drive");
        }).then(function () {
            return globalUtil.waitForVisibility(settingsPage.addOtherDeviceButton.device('addCDRomItem'));
        }).then(function () {
            return settingsPage.addOtherDeviceButton.device('addCDRomItem').click();
        }).then(function () {
            return racetrack.log("- - Click CD/DVD drive slide down");
        }).then(function () {
            return globalUtil.waitForVisibility(cdromSlideDown.self(deviceNum));
        }).then(function () {
            return browser.executeScript('arguments[0].scrollIntoView()', cdromSlideDown.self(deviceNum).getWebElement());
        }).then(function () {
            return cdromSlideDown.self(deviceNum).click();
        }).then(function () {
            return racetrack.log("- - Click CDROM controller drop down");
        }).then(function () {
            return globalUtil.waitForVisibility(cdromSlideDown.cdromControllerDropDown.self(deviceNum));
        }).then(function () {
            return cdromSlideDown.cdromControllerDropDown.self(deviceNum).click();
        }).then(function () {
            return racetrack.log("- - Select controller type: " + controllerType);
        }).then(function () {
            return globalUtil.waitForVisibility(cdromSlideDown.cdromControllerDropDown.cdromController(controllerType));
        }).then(function () {
            return cdromSlideDown.cdromControllerDropDown.cdromController(controllerType).click();
        }).then(function () {
            return racetrack.log("- - Click CDROM location drop down");
        }).then(function () {
            return globalUtil.waitForVisibility(cdromSlideDown.cdromLocationDropDown.self(deviceNum));
        }).then(function () {
            return cdromSlideDown.cdromLocationDropDown.self(deviceNum).click();
        }).then(function () {
            return racetrack.log("- - Select location type: " + location);
        }).then(function () {
            return globalUtil.waitForVisibility(cdromSlideDown.cdromLocationDropDown.cdromLocation(location));
        }).then(function () {
            return cdromSlideDown.cdromLocationDropDown.cdromLocation(location).click();
        })
    };

    this.editCDROM = function(settingsPage, deviceNum, controllerType, location) {
        //console.log("addCDROM deviceNum:" + deviceNum);

        var cdromSlideDown = settingsPage.cdromSlideDown;
        
        return globalUtil.waitForVisibility(cdromSlideDown.self(deviceNum)).then(function () {
            return racetrack.log("- - Click CD/DVD drive slide down");
        }).then(function () {
            return browser.executeScript('arguments[0].scrollIntoView()', cdromSlideDown.self(deviceNum).getWebElement());
        }).then(function () {
            return cdromSlideDown.self(deviceNum).click();
        }).then(function () {
            return racetrack.log("- - Click CDROM controller drop down");
        }).then(function () {
            return globalUtil.waitForVisibility(cdromSlideDown.cdromControllerDropDown.self(deviceNum));
        }).then(function () {
            return cdromSlideDown.cdromControllerDropDown.self(deviceNum).click();
        }).then(function () {
            return racetrack.log("- - Select controller type: " + controllerType);
        }).then(function () {
            return globalUtil.waitForVisibility(cdromSlideDown.cdromControllerDropDown.cdromController(controllerType));
        }).then(function () {
            return cdromSlideDown.cdromControllerDropDown.cdromController(controllerType).click();
        }).then(function () {
            return racetrack.log("- - Click CDROM location drop down");
        }).then(function () {
            return globalUtil.waitForVisibility(cdromSlideDown.cdromLocationDropDown.self(deviceNum));
        }).then(function () {
            return cdromSlideDown.cdromLocationDropDown.self(deviceNum).click();
        }).then(function () {
            return racetrack.log("- - Select location type: " + location);
        }).then(function () {
            return globalUtil.waitForVisibility(cdromSlideDown.cdromLocationDropDown.cdromLocation(location));
        }).then(function () {
            return cdromSlideDown.cdromLocationDropDown.cdromLocation(location).click();
        })
    };

    this.addDevice = function (settingsPage, deviceID) {
        return globalUtil.waitForVisibility(settingsPage.addOtherDeviceButton.self()).then(function () {
            return racetrack.log("- - Click Add other device");
        }).then(function () {
            return settingsPage.addOtherDeviceButton.self().click();
        }).then(function () {
            return racetrack.log("- - Click the device menu: " + deviceID);
        }).then(function () {
            return globalUtil.waitForVisibility(settingsPage.addOtherDeviceButton.device(deviceID));
        }).then(function () {
            return settingsPage.addOtherDeviceButton.device(deviceID).click();
        })
    };

    this.addHardDisk = function (settingsPage, deviceID) {
        return globalUtil.waitForVisibility(settingsPage.addHDButton.self()).then(function () {
            return racetrack.log("- - Click Add hard disk");
        }).then(function () {
            return settingsPage.addHDButton.self().click();
        }).then(function () {
            return racetrack.log("- - Click the menu: " + deviceID);
        }).then(function () {
            return globalUtil.waitForVisibility(settingsPage.addHDButton.device(deviceID));
        }).then(function () {
            return settingsPage.addHDButton.device(deviceID).click();
        })
    };

    this.addNetworkAdapter = function (settingsPage, deviceID){
        return globalUtil.waitForVisibility(settingsPage.addNetworkButton.self()).then(function () {
            return racetrack.log("- - Click Add network adapter");
        }).then(function () {
            return settingsPage.addNetworkButton.self().click();
        }).then(function () {
            return racetrack.log("- - Click the menu: " + deviceID);
        // }).then(function () {
        //     return globalUtil.waitForVisibility(settingsPage.addNetworkAdapterButton.device(deviceID));
        // }).then(function () {
        //     return settingsPage.addNetworkAdapterButton.device(deviceID).click();
        })
    };

    this.changeVMOptionsRemoteConsole = function (settingsPage, lockGOS, limitSession, sessionNum) {

        var remoteConsoleSlideDown;

        return racetrack.log("- - Click VM Options tab.").then(function() {
            return globalUtil.waitForVisibility(settingsPage.vmOptionsTab.self());
        }).then(function() {
            return settingsPage.vmOptionsTab.self().click();
        }).then(function(){
            remoteConsoleSlideDown = settingsPage.vmOptionsTab.remoteConsoleSlideDown;
            return globalUtil.waitForVisibility(remoteConsoleSlideDown.self());
        }).then(function() {
            return remoteConsoleSlideDown.self().click();
        }).then(function(){
            if(lockGOS){
                return racetrack.log("- - Check 'Lock the guest operating system when the last remote user disconnects.'").then(function () {
                    return globalUtil.waitForVisibility(remoteConsoleSlideDown.guestOSLockCheckBox(true));
                }).then(function(){
                    return remoteConsoleSlideDown.guestOSLockCheckBox(true).click();
                })
            }
        }).then(function() {
            if(limitSession){
                return racetrack.log("- - Check 'Limit the number of simultaneous connections to this virtual machine .'").then(function () {
                    return globalUtil.waitForVisibility(remoteConsoleSlideDown.maximumNumberSessionsCheckBox())
                }).then(function () {
                    return remoteConsoleSlideDown.maximumNumberSessionsCheckBox().click();
                }).then(function () {
                    return racetrack.log("- - Change the value to "+ sessionNum +"in maximum number of sessions.")
                }).then(function(){
                    return globalUtil.waitForVisibility(remoteConsoleSlideDown.maximumNumberSessionsValue().clear());
                }).then(function() {
                    return remoteConsoleSlideDown.maximumNumberSessionsValue().sendKeys(sessionNum);
                })
            }
        });
    };

    this.changeVMOptionsVMTools = function (settingsPage) {

        var vmToolsSlideDown;

        return racetrack.log("- - Click VM Options tab.").then(function() {
            return globalUtil.waitForVisibility(settingsPage.vmOptionsTab.self());
        }).then(function() {
            return settingsPage.vmOptionsTab.self().click();
        }).then(function(){
            vmToolsSlideDown = settingsPage.vmOptionsTab.vmToolsSlideDown;
            return globalUtil.waitForVisibility(vmToolsSlideDown.self());
        }).then(function() {
            return vmToolsSlideDown.self().click();
        }).then(function(){
            return racetrack.log("- - Change Power options, Stop, Pause and Restart");
        }).then(function () {
            return globalUtil.waitForVisibility(vmToolsSlideDown.powerOperationStopDropDown.self());
        }).then(function(){
            return vmToolsSlideDown.powerOperationStopDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(vmToolsSlideDown.powerOperationStopDropDown.powerValue(0));
        }).then(function(){
            return vmToolsSlideDown.powerOperationStopDropDown.powerValue(0).click();

        }).then(function () {
            return globalUtil.waitForVisibility(vmToolsSlideDown.powerOperationPauseDropDown.self());
        }).then(function(){
            return vmToolsSlideDown.powerOperationPauseDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(vmToolsSlideDown.powerOperationPauseDropDown.powerValue(0));
        }).then(function(){
            return vmToolsSlideDown.powerOperationPauseDropDown.powerValue(0).click();

        }).then(function () {
            return globalUtil.waitForVisibility(vmToolsSlideDown.powerOperationRestartDropDown.self());
        }).then(function(){
            return vmToolsSlideDown.powerOperationRestartDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(vmToolsSlideDown.powerOperationRestartDropDown.powerValue(0));
        }).then(function() {
            return vmToolsSlideDown.powerOperationRestartDropDown.powerValue(0).click();
        }).then(function(){
            return racetrack.log("- - Change 'Run Vmware Tools Scripts' options");
        }).then(function(){
            return vmToolsSlideDown.runScripts.afterPoweringOn().click();
        }).then(function(){
            return vmToolsSlideDown.runScripts.afterResuming().click();
        }).then(function(){
            return vmToolsSlideDown.runScripts.beforeSuspending().click();
        }).then(function(){
            return vmToolsSlideDown.runScripts.beforeShuttingDown().click();
        });
    };

    this.changeVMOptionsAdvanced = function (settingsPage) {

        var advancedSlideDown;

        return racetrack.log("- - Click VM Options tab.").then(function() {
            return globalUtil.waitForVisibility(settingsPage.vmOptionsTab.self());
        }).then(function() {
            return settingsPage.vmOptionsTab.self().click();
        }).then(function(){
            advancedSlideDown = settingsPage.vmOptionsTab.advancedSlideDown;
            return globalUtil.waitForVisibility(advancedSlideDown.self());
        }).then(function() {
            return advancedSlideDown.self().click();
        }).then(function(){
            return racetrack.log("- - Change Settings: disable acceleration and disable logging");
        }).then(function () {
            return globalUtil.waitForVisibility(advancedSlideDown.disableAccelerationCheckbox());
        }).then(function(){
            return advancedSlideDown.disableAccelerationCheckbox().click();
        }).then(function(){
            return advancedSlideDown.enableLoggingCheckbox().click();
        }).then(function(){
            return racetrack.log("- - Change swap file location to 'Virtual machine directory'");
        }).then(function () {
            return advancedSlideDown.swapFileLocationRadioButton(1).click();
        }).then(function(){
            return racetrack.log("- - Change latency sensitivity to Low");
        }).then(function () {
            return globalUtil.waitForVisibility(advancedSlideDown.latencySensitivityDropDown.self());
        }).then(function(){
            return advancedSlideDown.latencySensitivityDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(advancedSlideDown.latencySensitivityDropDown.latencySensitivityValue(0));
        }).then(function(){
            return advancedSlideDown.latencySensitivityDropDown.latencySensitivityValue(0).click();
        });
    };

    this.changeVMOptionsBoot = function (settingsPage) {

        var bootOptionSlideDown;

        return racetrack.log("- - Click VM Options tab.").then(function() {
            return globalUtil.waitForVisibility(settingsPage.vmOptionsTab.self());
        }).then(function() {
            return settingsPage.vmOptionsTab.self().click();
        }).then(function(){
            bootOptionSlideDown = settingsPage.vmOptionsTab.bootOptionSlideDown;
            return globalUtil.waitForVisibility(bootOptionSlideDown.self());
        }).then(function() {
            return bootOptionSlideDown.self().click();
        }).then(function() {
            return racetrack.log("- - Change Fimeware to EFI");
        }).then(function () {
            return globalUtil.waitForVisibility(bootOptionSlideDown.firmwareDropDown.self());
        }).then(function(){
            return bootOptionSlideDown.firmwareDropDown.self().click();
        }).then(function(){
            return globalUtil.waitForVisibility(bootOptionSlideDown.firmwareDropDown.firmwareValue(1));
        }).then(function(){
            return bootOptionSlideDown.firmwareDropDown.firmwareValue(1).click();
        }).then(function() {
            return racetrack.log("- - Select Force BIOS setup");
        }).then(function() {
            return bootOptionSlideDown.forceBiosSetupCheckbox().click();
        }).then(function() {
            return racetrack.log("- - Select Failed Boot Recovery and enter new retry timeout 30 seconds");
        }).then(function() {
            return bootOptionSlideDown.failedBootRecoveryCheckbox().click();
        }).then(function() {
            return bootOptionSlideDown.failedBootRecoveryValueTextBox().clear();
        }).then(function() {
            return bootOptionSlideDown.failedBootRecoveryValueTextBox().sendKeys(30);
        });
    };

    this.createVMWithDefaultSettings = function (VMPage, vmName, EsxuiPage) {

        var newVMWizard = VMPage.createRegisterVMButton.newVMWizard;
        // create-vm with default settings
        return globalUtil.waitForVisibility(VMPage.createRegisterVMButton.self()).then(function(){
            return VMPage.createRegisterVMButton.self().click();
        }).then(function(){
            var windows = browser.params.vmMsg.vm.wizard.basics.osVersion.windowsGuest;
            return self.createVM(newVMWizard, EsxuiPage, vmName, windows, 'Windows 10 32', 512, 8, 'Customize Provisioning', 0, 'thin');
        })

    };

    this.deleteVMFromGridByName = function (VMPage, vmName) {

        var vmGrid = VMPage.vmGrid,
            confirmDeleteButton;

        return globalUtil.waitForVisibility(VMPage.refreshButton()).then(function(){
            return racetrack.log("- - Click Refresh button");
        }).then(function () {
            return VMPage.refreshButton().click();
        }).then(function(){
            return racetrack.log("- - Right click the VM name: " + vmName);
        }).then(function () {
            return globalUtil.waitForVisibility(vmGrid.getVMLinkByName(vmName));
        }).then(function(){
            return browser.actions().mouseMove(vmGrid.getVMLinkByName(vmName)).perform();
        }).then(function(){
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function(){
            return browser.sleep(2000);
        }).then(function(){
            return racetrack.log("- - Select Delete menu");
        }).then(function(){
            return globalUtil.waitForVisibility(vmGrid.rightClickContextMenu.delete());
        }).then(function(){
            return vmGrid.rightClickContextMenu.delete().click();
        }).then(function(){
            confirmDeleteButton = VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(confirmDeleteButton);
        }).then(function() {
            //Click on Delete
            return confirmDeleteButton.click();
        });
    };
    
    this.createVMSnapshot = function (VMPage, EsxuiPage, vmName, snapshotName) {

        var snapshotsMenu = VMPage.actionsButton.snapshotsMenu,
            takeSnapshotButton;

        return globalUtil.waitForVisibility(VMPage.vmGrid.getVMCheckBoxByName(vmName)).then(function(){
            return racetrack.log("- - Click the non-ASCII VM: " + vmName);
        }).then(function () {
            return VMPage.vmGrid.getVMCheckBoxByName(vmName).click();
        }).then(function () {
            return browser.sleep(2000);
        }).then(function () {
            return racetrack.log("- - Click Action button.");
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.actionsButton.self());
        }).then(function () {
            return VMPage.actionsButton.self().click();
        }).then(function () {
            return browser.sleep(2000);
        }).then(function () {
            return racetrack.log("- - Click Snapshot > Take Snapshot menu.");
        }).then(function () {
            return globalUtil.waitForVisibility(snapshotsMenu.self());
        }).then(function () {
            return browser.actions().mouseMove(snapshotsMenu.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().mouseMove({x:1,y:-1}).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().mouseMove(snapshotsMenu.takeSnapshotMenu()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return snapshotsMenu.takeSnapshotMenu().click()
        }).then(function () {
            return racetrack.log("- - Enter Snapshot name: " + snapshotName);
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.takeSnapshotDialog.nameTextBox());
        }).then(function () {
            return VMPage.takeSnapshotDialog.nameTextBox().sendKeys(snapshotName);
        }).then(function () {
            return racetrack.log("- - Click OK button to create the snapshot.");
        }).then(function () {
            // Click Take snapshot button
            takeSnapshotButton = VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(takeSnapshotButton);
        }).then(function () {
            return takeSnapshotButton.click();
        }).then(function(){
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_SNAPSHOT_ACTION);
        }).then(function() {                                                 //add
            return globalUtil.waitForVisibility(EsxuiPage.refreshButton());  //add
        }).then(function(){                                                   //add
            return racetrack.log("- - Click Refresh button");         //add
        }).then(function () {                                           //add
            return EsxuiPage.refreshButton().click();                    //add
        });

    };

    this.revertVMSnapshot = function (VMPage, EsxuiPage) {

        var snapshotsMenu = VMPage.actionsButton.snapshotsMenu,
            restoreSnapshotButton;

        return globalUtil.waitForVisibility(VMPage.actionsButton.self()).then(function() {
            return racetrack.log("- - Click Action button");
        }).then(function () {
            return VMPage.actionsButton.self().click();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return racetrack.log("- - Click Snapshot menu.");
        }).then(function () {
            return globalUtil.waitForVisibility(snapshotsMenu.self());
        }).then(function () {
            return browser.actions().mouseMove(snapshotsMenu.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().mouseMove({x:1,y:-1}).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().mouseMove(snapshotsMenu.takeSnapshotMenu()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().mouseMove(snapshotsMenu.restoreSnapshotMenu()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return snapshotsMenu.restoreSnapshotMenu().click()
        }).then(function () {
            return racetrack.log("- - Click Restore button to restore the snapshot.");
        }).then(function () {
            restoreSnapshotButton = VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(restoreSnapshotButton);
        }).then(function () {
            return restoreSnapshotButton.click();
        }).then(function(){
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_SNAPSHOT_ACTION);
        });
    };

    this.revertVMSnapshotViaManageWindow = function (VMPage, EsxuiPage, snapshotName) {

        var snapshotsMenu = VMPage.actionsButton.snapshotsMenu,
            restoreSnapshotButton, manageSnapshotsDialog, closeButton;

        return globalUtil.waitForVisibility(VMPage.actionsButton.self()).then(function() {
            return racetrack.log("- - Click Action button");
        }).then(function () {
            return VMPage.actionsButton.self().click();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return racetrack.log("- - Click Snapshot > Manage Snapshots");
        }).then(function () {
            return globalUtil.waitForVisibility(snapshotsMenu.self());
        }).then(function () {
            return browser.actions().mouseMove(snapshotsMenu.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().mouseMove(snapshotsMenu.takeSnapshotMenu()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().mouseMove(snapshotsMenu.manageSnapshotsMenu.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return snapshotsMenu.manageSnapshotsMenu.self().click()
        }).then(function () {
            return racetrack.log("- - Select a previous snapshot in Manage snapshots dialog");
        }).then(function () {
            manageSnapshotsDialog = snapshotsMenu.manageSnapshotsMenu.manageSnapshotsDialog;
            return globalUtil.waitForVisibility(manageSnapshotsDialog.getSnapshotByName(snapshotName));
        }).then(function () {
            return manageSnapshotsDialog.getSnapshotByName(snapshotName).click();
        }).then(function () {
            return racetrack.log("- - Click Restore snapshot button");
        }).then(function () {
            return globalUtil.waitForVisibility(manageSnapshotsDialog.restoreSnapshotButton());
        }).then(function () {
            return manageSnapshotsDialog.restoreSnapshotButton().click();
        }).then(function () {
            return racetrack.log("- - Click Restore button to confirm restore the snapshot.");
        }).then(function () {
            restoreSnapshotButton = VMPage.popUpDialog.okButton(1);
            return globalUtil.waitForVisibility(restoreSnapshotButton);
        }).then(function () {
            return restoreSnapshotButton.click();
        }).then(function () {
            return racetrack.log("- - Close the Manage snapshots dialog");
        }).then(function () {
            closeButton = VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(closeButton);
        }).then(function () {
            return closeButton.click();
        }).then(function(){
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_SNAPSHOT_ACTION);
        });
    };

    this.editVMmemory = function(VMPage,EsxuiPage, vmName,newSize){

        var saveButton, editSettingsDialog;

        return globalUtil.waitForVisibility(VMPage.vmGrid.getVMCheckBoxByName(vmName)).then(function () {
            return racetrack.log("- - Select the non-ASCII VM and click Action button");
        }).then(function () {
            return VMPage.vmGrid.getVMCheckBoxByName(vmName).click();
        }).then(function () {
            return browser.sleep(2000);
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.actionsButton.self());
        }).then(function () {
            return VMPage.actionsButton.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.actionsButton.editSettingsMenu());
        }).then(function () {
            return racetrack.log("- - Click Edit Settings.");
        }).then(function () {
            return VMPage.actionsButton.editSettingsMenu().click();
        }).then(function () {
            return browser.sleep(10000);
        }).then(function () {
            return racetrack.log("- - Chang RAM to "+ newSize + "MB");
        }).then(function () {
            editSettingsDialog = VMPage.createRegisterVMButton.newVMWizard;
            return globalUtil.waitForVisibility(editSettingsDialog.memoryTextbox(0));
        }).then(function () {
            return editSettingsDialog.memoryTextbox(0).sendKeys('');
        }).then(function () {
            return editSettingsDialog.memoryTextbox(0).clear();
        }).then(function () {
            return editSettingsDialog.memoryTextbox(0).sendKeys(newSize);
        }).then(function () {
            return racetrack.log("- - Click save button to save the changes.");
        }).then(function () {
            saveButton = VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function(){
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_EDIT);
        });
    };

    this.editVMnotes = function(VMPage,vmName, notes){

        var saveButton;

        return racetrack.log("- - Select the non-ASCII VM and click Action button.").then(function(){
            return globalUtil.waitForVisibility(VMPage.vmGrid.getVMCheckBoxByName(vmName));
        }).then(function(){
            return VMPage.vmGrid.getVMCheckBoxByName(vmName).click();
        }).then(function(){
            return browser.sleep(2000);
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.actionsButton.self());
        }).then(function () {
            return VMPage.actionsButton.self().click();
        }).then(function () {
            return racetrack.log("- - Click Edit Notes.");
        }).then(function(){
            return globalUtil.waitForVisibility(VMPage.actionsButton.editNotesMenu());
        }).then(function () {
            return VMPage.actionsButton.editNotesMenu().click();
        }).then(function () {
            return racetrack.log("- - Enter non-ASCII notes: " + notes);
        }).then(function(){
            return globalUtil.waitForVisibility(VMPage.editNotesDialog.notesTextArea());
        }).then(function () {
            return VMPage.editNotesDialog.notesTextArea().sendKeys(notes);
        }).then(function () {
            saveButton = VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return racetrack.log("- - Click Save button to save the chagnes");
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_EDIT);
        });
    };

    this.powerOnVMFromGridByName = function (VMpage, vmName) {

        var powerMenu;

        return racetrack.log("- - Right click the non-ASCII VM name.").then(function() {
            return globalUtil.waitForVisibility(VMpage.vmGrid.getVMLinkByName(vmName));
        }).then(function(){
            return browser.actions().mouseMove(VMpage.vmGrid.getVMLinkByName(vmName)).perform();
        }).then(function(){
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function() {
            return browser.sleep(1000);
        }).then(function(){
            return racetrack.log("- - Select Power > Power On menu");
        }).then(function(){
            powerMenu = VMpage.vmGrid.rightClickContextMenu.powerMenu;
            return browser.actions().mouseMove(powerMenu.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return powerMenu.powerOnMenu().click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_POWER_ON);
        });
    };

    this.powerOffVMFromGridByName = function (VMPage, vmName) {

        var powerMenu, yesButton;
        return racetrack.log("- - Right click the non-ASCII VM name.").then(function() {
            return globalUtil.waitForVisibility(VMPage.vmGrid.getVMLinkByName(vmName));
        }).then(function() {
            return browser.actions().mouseMove(VMPage.vmGrid.getVMLinkByName(vmName)).perform();
        }).then(function(){
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function(){
            return browser.sleep(1000);
        }).then(function(){
            return racetrack.log("- - Select Power > Power Off menu");
        }).then(function(){
            powerMenu = VMPage.vmGrid.rightClickContextMenu.powerMenu;
            return globalUtil.waitForVisibility(powerMenu.self());
        }).then(function(){
            return browser.actions().mouseMove(powerMenu.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().mouseMove({x:1,y:-1}).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function(){
            return browser.actions().mouseMove(powerMenu.powerOnMenu()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function(){
            return powerMenu.powerOffMenu().click();
        }).then(function () {
            yesButton = VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(yesButton);
        }).then(function () {
            return racetrack.log("- - Click Yes button to power off the VM");
        }).then(function () {
            return yesButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_POWER_OFF);
        });
    };

    this.suspendVMFromGridByName = function (VMPage, vmName) {

        var powerMenu;
        return racetrack.log("- - Right click the non-ASCII VM name.").then(function() {
            return globalUtil.waitForVisibility(VMPage.vmGrid.getVMLinkByName(vmName));
        }).then(function(){
            return browser.actions().mouseMove(VMPage.vmGrid.getVMLinkByName(vmName)).perform();
        }).then(function(){
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function(){
            return browser.sleep(1000);
        }).then(function(){
            return racetrack.log("- - Select Power > Suspend menu");
        }).then(function(){
            powerMenu = VMPage.vmGrid.rightClickContextMenu.powerMenu;
            return globalUtil.waitForVisibility(powerMenu.self());
        }).then(function(){
            return browser.actions().mouseMove(powerMenu.self())
                .mouseMove(powerMenu.suspendMenu())
                .click()
                .mouseMove(VMPage.actionsButton.self())
                .perform();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_SUSPEND);
        });
    };

    this.resetVMFromGridByName = function (VMPage, vmName) {

        var powerMenu, yesButton;
        return racetrack.log("- - Right click the non-ASCII VM name.").then(function() {
            return globalUtil.waitForVisibility(VMPage.vmGrid.getVMLinkByName(vmName));
        }).then(function() {
            return browser.actions().mouseMove(VMPage.vmGrid.getVMLinkByName(vmName)).perform();
        }).then(function(){
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function(){
            return browser.sleep(1000);
        }).then(function(){
            return racetrack.log("- - Select Power > Reset menu");
        }).then(function(){
            powerMenu = VMPage.vmGrid.rightClickContextMenu.powerMenu;
            return globalUtil.waitForVisibility(powerMenu.self());
        }).then(function(){
            return browser.actions().mouseMove(powerMenu.self()).perform();
        }).then(function(){
            return browser.sleep(1000);
        }).then(function(){
            return powerMenu.resetMenu().click();
        }).then(function () {
            yesButton = VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(yesButton);
        }).then(function () {
            return racetrack.log("- - Click Yes button to reset the VM");
        }).then(function () {
            return yesButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_RESET);
        });
    };

    this.unregisterVMByName = function (VMPage, EsxuiPage, vmName) {

        var yesButton;
        return racetrack.log("- - Right click the non-ASCII VM name.").then(function() {
            return globalUtil.waitForVisibility(VMPage.vmGrid.getVMLinkByName(vmName));
        }).then(function(){
            return browser.actions().mouseMove(VMPage.vmGrid.getVMLinkByName(vmName)).perform();
        }).then(function(){
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function(){
            return browser.sleep(1000);
        }).then(function(){
            return racetrack.log("- - Select unregister menu");
        }).then(function(){
            return globalUtil.waitForVisibility(VMPage.vmGrid.rightClickContextMenu.unregisterMenu());
        }).then(function (){
            //Click on Unregister VM
            return VMPage.vmGrid.rightClickContextMenu.unregisterMenu().click();
        }).then(function () {
            yesButton = VMPage.popUpDialog.okButton(0);
            //Click on Yes
            return globalUtil.waitForVisibility(yesButton);
        }).then(function () {
            return yesButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_RESISTER_ACTION);
        }).then(function () {
            return VMPage.refreshButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.vmGrid.self());
        });
    };


};
module.exports = VirtualMachineUtil;
