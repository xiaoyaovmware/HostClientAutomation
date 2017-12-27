'use strict';
var GlobalUtil = require('../../../../common/globalUtil.js');
var globalUtil = new GlobalUtil();
var Timeout = require('../../../../common/timeout.js');
var Racetrack = require('../../../../common/racetrack.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var PortGroupUtil = function () {

    var racetrack = new Racetrack();
    var esxuiUtil = new EsxuiUtil();

    this.createPortGroup = function (PortGroupPage, EsxuiPage, vSwitchName, portGroupName) {

        var addPortGroupDialog, addButton;

        return globalUtil.waitForVisibility(PortGroupPage.refreshButton()).then(function () {
            return PortGroupPage.refreshButton().click();
        }).then(function () {
            return racetrack.log("- - Click Add Port Group button.");
        }).then(function () {
            return globalUtil.waitForVisibility(PortGroupPage.addPortGroupButton());
        }).then(function () {
            return PortGroupPage.addPortGroupButton().click();
        }).then(function () {
            return racetrack.log("- - Enter non-ASCII port group name: " + portGroupName);
        }).then(function () {
            addPortGroupDialog = PortGroupPage.addPortGroupDialog;
            return globalUtil.waitForVisibility(addPortGroupDialog.portGroupNameTextBox());
        }).then(function () {
            return addPortGroupDialog.portGroupNameTextBox().sendKeys(portGroupName);
        }).then(function () {
            return racetrack.log("- - Select the non-ASCII vSwitch: " + vSwitchName);
        }).then(function () {
            return globalUtil.waitForVisibility(addPortGroupDialog.vSwitchDropDown.self());
        }).then(function () {
            return addPortGroupDialog.vSwitchDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(addPortGroupDialog.vSwitchDropDown.vSwitchOption(vSwitchName));
        }).then(function () {
            return addPortGroupDialog.vSwitchDropDown.vSwitchOption(vSwitchName).click();
        }).then(function () {
            return racetrack.log("- - Click Add button");
        }).then(function () {
            addButton = PortGroupPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(addButton);
        }).then(function () {
            return addButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            //Wait for tasks to finish
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        })
    };

    this.deletePortGroup = function (PortGroupPage, EsxuiPage, portGroupName) {
        var confirmRemoveButton;

        return globalUtil.waitForVisibility(PortGroupPage.refreshButton()).then(function () {
            return PortGroupPage.refreshButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(PortGroupPage.portGroupGrid.getPortGroupLinkByName(portGroupName));
        }).then(function () {
            return racetrack.log("- - Right click the non-ASCII Port Group.");
        }).then(function () {
            return browser.actions().mouseMove(PortGroupPage.portGroupGrid.getPortGroupLinkByName(portGroupName)).perform();
        }).then(function () {
			return browser.sleep(1000);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
			return browser.sleep(2000);
        }).then(function () {
            return racetrack.log("- - Select Remove.");
		}).then(function () {
			return browser.actions().mouseMove(PortGroupPage.rightClickContextMenu.removMenu()).perform();
		}).then(function () {
			return browser.sleep(1000);
		}).then(function () {
            return PortGroupPage.rightClickContextMenu.removMenu().click();
        }).then(function () {
            return racetrack.log("- - Click Confirm to remove the non-ASCII Port Group.");
        }).then(function () {
            confirmRemoveButton = PortGroupPage.popUpDialog.okButton();
            globalUtil.waitForVisibility(confirmRemoveButton);
        }).then(function () {
            return confirmRemoveButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        });
    };

    this.renamePortGroup = function (PortGroupPage, portGroupName, newPortGroupName) {
        var editPortGroupDialog, saveButton;

        return globalUtil.waitForVisibility(PortGroupPage.refreshButton()).then(function () {
            return PortGroupPage.refreshButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(PortGroupPage.portGroupGrid.getPortGroupLinkByName(portGroupName));
        }).then(function () {
            return racetrack.log("- - Right click the non-ASCII Port Group.");
        }).then(function () {
            return browser.actions().mouseMove(PortGroupPage.portGroupGrid.getPortGroupLinkByName(portGroupName)).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return browser.sleep(2000);
        }).then(function () {
            return racetrack.log("- - Select Edit Settings.");
        }).then(function () {
			return browser.actions().mouseMove(PortGroupPage.rightClickContextMenu.editSettingsMenu()).perform();
		}).then(function () {
			return browser.sleep(1000);
        }).then(function () {
            return PortGroupPage.rightClickContextMenu.editSettingsMenu().click();
        }).then(function () {
            return racetrack.log("- - Enter new non-ASCII Port Group name: " + newPortGroupName);
        }).then(function () {
            editPortGroupDialog = PortGroupPage.editPortGroupDialog;
            return globalUtil.waitForVisibility(editPortGroupDialog.portGroupNameTextBox());
        }).then(function () {
            return editPortGroupDialog.portGroupNameTextBox().clear();
        }).then(function () {
            return editPortGroupDialog.portGroupNameTextBox().sendKeys(newPortGroupName);
        }).then(function () {
            return racetrack.log("- - Click Save button to save the changes.");
        }).then(function () {
            // Click 'Save'
            saveButton = PortGroupPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        });
    };

    this.changePortGroupvSwitch = function (PortGroupPage, ManagementNetworkPage, portGroupName, newvSwitchName) {
        var editPortGroupDialog, saveButton;

        return globalUtil.waitForVisibility(PortGroupPage.refreshButton()).then(function () {
            return PortGroupPage.refreshButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(PortGroupPage.portGroupGrid.getPortGroupLinkByName(portGroupName));
        }).then(function () {
            return racetrack.log("- - Click the non-ASCII Port Group.");
        }).then(function () {
            return PortGroupPage.portGroupGrid.getPortGroupLinkByName(portGroupName).click();
        }).then(function () {
            return racetrack.log("- - Click Edit settings button");
        }).then(function () {
            return globalUtil.waitForVisibility(ManagementNetworkPage.editSettingsButton());
        }).then(function () {
            return ManagementNetworkPage.editSettingsButton().click();
        }).then(function () {
            return racetrack.log("- - Change the vSwitch to new non-ASCII vSwitch: " + newvSwitchName);
        }).then(function () {
            editPortGroupDialog = ManagementNetworkPage.editPortGroupDialog;
            return globalUtil.waitForVisibility(editPortGroupDialog.vSwitchDropDown.self());
        }).then(function () {
            return editPortGroupDialog.vSwitchDropDown.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(editPortGroupDialog.vSwitchDropDown.vSwitchOption(newvSwitchName));
        }).then(function () {
            return editPortGroupDialog.vSwitchDropDown.vSwitchOption(newvSwitchName).click();
        }).then(function () {
            return racetrack.log("- - Click Save button to save the changes.");
        }).then(function () {
            saveButton = ManagementNetworkPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        });
    };

};
module.exports = PortGroupUtil;
