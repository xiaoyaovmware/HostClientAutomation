'use strict';
var GlobalUtil = require('../../../../common/globalUtil.js');
var Timeout = require('../../../../common/timeout.js');
var globalUtil = new GlobalUtil();
var Racetrack = require('../../../../common/racetrack.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMKernelNicUtil = function () {

    var racetrack = new Racetrack();
    var esxuiUtil = new EsxuiUtil();

    this.createVMKernel = function (VmKernelNicPage, EsxuiPage, vSwitchName, portGroupName) {

        var addVMKernelNicDialog, createButton;

        return globalUtil.waitForVisibility(VmKernelNicPage.addVMKernelNicButton()).then(function () {
            return VmKernelNicPage.addVMKernelNicButton().click();
        }).then(function () {
            return racetrack.log("- - Click Add VM Kernel NIC button");
        }).then(function () {
            return racetrack.log("- - Enter non-ASCII Port Group name: " + portGroupName);
        }).then(function () {
            //Wait for dialog to load and enter port group name
            addVMKernelNicDialog = VmKernelNicPage.addVMKernelNicDialog;
            return globalUtil.waitForVisibility(addVMKernelNicDialog.newPortGroupNameTextBox());
        }).then(function () {
            return addVMKernelNicDialog.newPortGroupNameTextBox().sendKeys(portGroupName);
        }).then(function () {
            return racetrack.log("- - Select the non-ASCII vSwitch from the vSwitch drop down");
        }).then(function () {
            return globalUtil.waitForVisibility(addVMKernelNicDialog.vSwitchDropDown.self());
        }).then(function () {
            return addVMKernelNicDialog.vSwitchDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(addVMKernelNicDialog.vSwitchDropDown.vSwitchOption(vSwitchName));
        }).then(function () {
            return addVMKernelNicDialog.vSwitchDropDown.vSwitchOption(vSwitchName).click();
        }).then(function () {
            return racetrack.log("- - Click Create button to create the VMkernel NIC.");
        }).then(function () {
            //Click Create port group name
            createButton = VmKernelNicPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(createButton);
        }).then(function () {
            return createButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            //Wait for tasks to finish
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        })
    };

    this.createIPv6VMKernel = function (VmKernelNicPage, EsxuiPage, vSwitchName, portGroupName, ipv6address, ipv6prefix) {

        var addVMKernelNicDialog, createButton;

        return globalUtil.waitForVisibility(VmKernelNicPage.addVMKernelNicButton()).then(function () {
            return VmKernelNicPage.addVMKernelNicButton().click();
        }).then(function () {
            return racetrack.log("- - Click Add VM Kernel NIC button");
        }).then(function () {
            return racetrack.log("- - Enter non-ASCII Port Group name: " + portGroupName);
        }).then(function () {
            //Wait for dialog to load and enter port group name
            addVMKernelNicDialog = VmKernelNicPage.addVMKernelNicDialog;
            return globalUtil.waitForVisibility(addVMKernelNicDialog.newPortGroupNameTextBox());
        }).then(function () {
            return addVMKernelNicDialog.newPortGroupNameTextBox().sendKeys(portGroupName);
        }).then(function () {
            return racetrack.log("- - Select the non-ASCII vSwitch from the vSwitch drop down");
        }).then(function () {
            return globalUtil.waitForVisibility(addVMKernelNicDialog.vSwitchDropDown.self());
        }).then(function () {
            return addVMKernelNicDialog.vSwitchDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(addVMKernelNicDialog.vSwitchDropDown.vSwitchOption(vSwitchName));
        }).then(function () {
            return addVMKernelNicDialog.vSwitchDropDown.vSwitchOption(vSwitchName).click();
        }).then(function () {
            return racetrack.log("- - Select the option IPv4 and IPv6 from IP version drop down");
        }).then(function () {
            return addVMKernelNicDialog.ipVersionDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(addVMKernelNicDialog.ipVersionDropDown.ipv4AndIPv6Option());
        }).then(function () {
            return addVMKernelNicDialog.ipVersionDropDown.ipv4AndIPv6Option().click();
        }).then(function () {
            return racetrack.log("- - Expand IPv6 settings label");
        }).then(function () {
            return globalUtil.waitForVisibility(addVMKernelNicDialog.ipv6SettingsLabel.self());
        }).then(function () {
            return addVMKernelNicDialog.ipv6SettingsLabel.self().click();
        }).then(function () {
            return racetrack.log("- - Click Add address button");
        }).then(function () {
            return globalUtil.waitForVisibility(addVMKernelNicDialog.ipv6SettingsLabel.addAddressButton());
        }).then(function () {
            return addVMKernelNicDialog.ipv6SettingsLabel.addAddressButton().click();
        }).then(function () {
            return racetrack.log("- - Input ipv6 address: " + ipv6address + " and input ipv6 prefix: " + ipv6prefix);
        }).then(function () {
            return globalUtil.waitForVisibility(addVMKernelNicDialog.ipv6SettingsLabel.addressTextbox());
        }).then(function () {
            return addVMKernelNicDialog.ipv6SettingsLabel.addressTextbox().clear();
        }).then(function () {
            return addVMKernelNicDialog.ipv6SettingsLabel.addressTextbox().sendKeys(ipv6address);
        }).then(function () {
            return addVMKernelNicDialog.ipv6SettingsLabel.prefixTextbox().clear();
        }).then(function () {
            return addVMKernelNicDialog.ipv6SettingsLabel.prefixTextbox().sendKeys(ipv6prefix);
        }).then(function () {
            return racetrack.log("- - Click Create button to create the VMkernel NIC.");
        }).then(function () {
            //Click Create port group name
            createButton = VmKernelNicPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(createButton);
        }).then(function () {
            return createButton.click();
        })
    };

    this.deleteVMKernelNic = function (VmKernelNicPage, EsxuiPage, vmKernelNicName) {

        var confirmRemoveButton;
        return globalUtil.waitForVisibility(VmKernelNicPage.vmKernelNicGrid.getVMKernelNicLinkByName(vmKernelNicName)).then(function () {
            return browser.actions().mouseMove(VmKernelNicPage.vmKernelNicGrid.getVMKernelNicLinkByName(vmKernelNicName)).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return racetrack.log("- - Right click the VMKernel NIC.");
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return racetrack.log("- - Select Remove from the context menu.");
        }).then(function () {
            return globalUtil.waitForVisibility(VmKernelNicPage.rightClickContextMenu.removMenu());
        }).then(function () {
            return VmKernelNicPage.rightClickContextMenu.removMenu().click();
        }).then(function () {
            return racetrack.log("- - Click Confirm to remove the VMKernel NIC.");
        }).then(function () {
            confirmRemoveButton = VmKernelNicPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(confirmRemoveButton);
        }).then(function () {
            return confirmRemoveButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        });

    };
};
module.exports = VMKernelNicUtil;
