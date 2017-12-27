'use strict';
var GlobalUtil = require('../../../../common/globalUtil');
var globalUtil = new GlobalUtil();
var Timeout = require('../../../../common/timeout.js');
var Racetrack = require('../../../../common/racetrack.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');


var VSwitchUtils = function () {
    var racetrack = new Racetrack();
    var esxuiUtil = new EsxuiUtil();

    this.createVswitch = function (VSwitchPage, EsxuiPage, vSwitchName) {

        var addButton;

        // The datagrid should load
        return globalUtil.waitForVisibility(VSwitchPage.vSwitchGrid.self()).then(function () {
            return racetrack.log("- - Click Add vSwitch button");
        }).then(function () {
            return globalUtil.waitForVisibility(VSwitchPage.addvSwitchButton());
        }).then(function () {
            return VSwitchPage.addvSwitchButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(VSwitchPage.addvSwitchDialog.vSwitchNameTextBox());
        }).then(function () {
            return racetrack.log("- - Enter non-ASCII vswitch name: " + vSwitchName);
        }).then(function () {
            return VSwitchPage.addvSwitchDialog.vSwitchNameTextBox().sendKeys(vSwitchName);
        }).then(function () {
            return racetrack.log("- - Click Add button to add the vSwitch.");
        }).then(function () {
            addButton = VSwitchPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(addButton);
        }).then(function () {
            return addButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        })
    };

    this.deleteVswitch = function (VSwitchPage, EsxuiPage, vSwitchName) {
        var vSwitchToBeDeleted, confirmRemoveButton;

        return globalUtil.waitForVisibility(VSwitchPage.refreshButton()).then(function () {
            return VSwitchPage.refreshButton().click();
        }).then(function () {
            // The datagrid should load
            return globalUtil.waitForVisibility(VSwitchPage.vSwitchGrid.self());
        }).then(function () {
            return racetrack.log("- - Right-click the non-ASCII vSwitch.");
        }).then(function () {
            vSwitchToBeDeleted = VSwitchPage.vSwitchGrid.getVSwitchLinkByName(vSwitchName);
            return globalUtil.waitForVisibility(vSwitchToBeDeleted);
        }).then(function () {
            // Right click on the new vswitch in the table to get the context menu
            return browser.actions().mouseMove(vSwitchToBeDeleted).perform();
		}).then(function () {	
			return browser.sleep(1000);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
		}).then(function () {	
			return browser.sleep(2000);
        }).then(function () {
            return racetrack.log("- - Select Remove menu.");
        }).then(function () {
            // Remove the vswitch
			return browser.actions().mouseMove(VSwitchPage.rightClickContextMenu.removMenu()).perform();
		}).then(function () {	
			return browser.sleep(1000);
		}).then(function () {		
            return VSwitchPage.rightClickContextMenu.removMenu().click();
        }).then(function () {
            return racetrack.log("- - Click Confirm button to remove the vSwitch.");
        }).then(function () {
            // Click 'Confirm'
            confirmRemoveButton = VSwitchPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(confirmRemoveButton);
        }).then(function () {
            return confirmRemoveButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        })
    };

    this.addUplink = function (VSwitchPage, EsxuiPage, vSwitchName) {
        var vSwitch, saveButton;

        return racetrack.log("- - Right-click the non-ASCII vSwitch.").then(function () {
            vSwitch = VSwitchPage.vSwitchGrid.getVSwitchLinkByName(vSwitchName);
            return globalUtil.waitForVisibility(vSwitch);
        }).then(function () {
            // Right click on the new vswitch in the table to get the context menu
            return browser.actions().mouseMove(vSwitch).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return browser.sleep(2000);
        }).then(function () {
            return racetrack.log("- - Select Add uplink menu.");
        }).then(function () {
            return browser.actions().mouseMove(VSwitchPage.rightClickContextMenu.addUplink.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return VSwitchPage.rightClickContextMenu.addUplink.self().click();
        }).then(function () {
            return racetrack.log("- - Click Save button in Edit standard virtual switch dialog to add the new uplink.");
        }).then(function () {
            saveButton = VSwitchPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        })
    };

    this.addUplinkInEditSettings = function (VSwitchPage, EsxuiPage, vSwitchName) {
        var vSwitch, saveButton, editSwitchDialog;

        return racetrack.log("- - Right-click the non-ASCII vSwitch.").then(function () {
            vSwitch = VSwitchPage.vSwitchGrid.getVSwitchLinkByName(vSwitchName);
            return globalUtil.waitForVisibility(vSwitch);
        }).then(function () {
            // Right click on the new vswitch in the table to get the context menu
            return browser.actions().mouseMove(vSwitch).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return browser.sleep(2000);
        }).then(function () {
            return racetrack.log("- - Select Edit Settings menu.");
        }).then(function () {
            return browser.actions().mouseMove(VSwitchPage.rightClickContextMenu.editSettings.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return VSwitchPage.rightClickContextMenu.editSettings.self().click();
        }).then(function () {
            return racetrack.log("- - Click Add Uplink button.");
        }).then(function () {
            editSwitchDialog = VSwitchPage.rightClickContextMenu.editSettings.editSwitchDialog;
            return globalUtil.waitForVisibility(editSwitchDialog.addUplinkButton());
        }).then(function () {
            return editSwitchDialog.addUplinkButton().click();
        }).then(function () {
            return racetrack.log("- - Click Save button to save the change.");
        }).then(function () {
            saveButton = VSwitchPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        })
    };

    this.deleteUplink = function (VSwitchPage, EsxuiPage, vSwitchName, uplinkNum) {
        var vSwitch, saveButton, editSwitchDialog;

        return racetrack.log("- - Right-click the non-ASCII vSwitch.").then(function () {
            vSwitch = VSwitchPage.vSwitchGrid.getVSwitchLinkByName(vSwitchName);
            return globalUtil.waitForVisibility(vSwitch);
        }).then(function () {
            // Right click on the new vswitch in the table to get the context menu
            return browser.actions().mouseMove(vSwitch).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return browser.sleep(2000);
        }).then(function () {
            return racetrack.log("- - Select Edit Settings menu.");
        }).then(function () {
            return browser.actions().mouseMove(VSwitchPage.rightClickContextMenu.editSettings.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return VSwitchPage.rightClickContextMenu.editSettings.self().click();
        }).then(function () {
            editSwitchDialog = VSwitchPage.rightClickContextMenu.editSettings.editSwitchDialog;
            return globalUtil.waitForVisibility(editSwitchDialog.removeUplinkButton(uplinkNum));
        }).then(function () {
            return editSwitchDialog.removeUplinkButton(1).click();
        }).then(function () {
            return racetrack.log("- - Click Save button to save the change.");
        }).then(function () {
            saveButton = VSwitchPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        })
    };


};
module.exports = VSwitchUtils;
