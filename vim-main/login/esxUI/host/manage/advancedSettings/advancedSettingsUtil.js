'user strict';


var Timeout = require('../../../../../common/timeout.js');
var GlobalUtil = require('../../../../../common/globalUtil.js');
var Racetrack = require('../../../../../common/racetrack.js');
var EsxuiUtil = require('../../../../../login/esxUI/esxuiUtil.js');

var AdvancedSettingsUtil = function() {

    var racetrack = new Racetrack();
    var globalUtil = new GlobalUtil();
    var esxuiUtil = new EsxuiUtil();
    
    this.changeAttributeValue = function (AdvancedSettingsPage, EsxuiPage, attribute, value) {

        var editOptionDialog, saveButton;

        return globalUtil.waitForVisibility(attribute).then(function () {
            return attribute.click();
        }).then(function () {
            return racetrack.log("- - Click on the attribute.");
        }).then(function () {
            return globalUtil.waitForVisibility(AdvancedSettingsPage.editOptionButton());
        }).then(function () {
            return racetrack.log("- - Click on Edit option button");
        }).then(function () {
            return AdvancedSettingsPage.editOptionButton().click();
        }).then(function () {
            editOptionDialog = AdvancedSettingsPage.editOptionDialog;
            return globalUtil.waitForVisibility(editOptionDialog.inputTextBox());
        }).then(function () {
            return racetrack.log("- - Enter non-ASCII value: " + value);
        //}).then(function () {
        //    return editOptionDialog.inputTextBox().clear();
        }).then(function () {
            return editOptionDialog.inputTextBox().sendKeys(value);
        }).then(function () {
            console.log("- - Click Save button to save the changes.");
            saveButton = AdvancedSettingsPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        });
    };

    this.checkAttributeValue = function (AdvancedSettingsPage, attribute, value) {

        var editOptionDialog, cancelButton;

        return globalUtil.waitForVisibility(attribute).then(function () {
            return attribute.click();
        }).then(function () {
            return racetrack.log("- - Click on the attribute.");
        }).then(function () {
            return globalUtil.waitForVisibility(AdvancedSettingsPage.editOptionButton());
        }).then(function () {
            return racetrack.log("- - Click on Edit option button");
        }).then(function () {
            return AdvancedSettingsPage.editOptionButton().click();
        }).then(function () {
            editOptionDialog = AdvancedSettingsPage.editOptionDialog;
            return globalUtil.waitForVisibility(editOptionDialog.inputTextBox());
        }).then(function () {
            return racetrack.log("- - Verified previous change has been saved.");
        }).then(function () {
            return expect(editOptionDialog.inputTextBox().getAttribute('value')).toEqual(value);
        }).then(function () {
            return racetrack.log("- - Click Canncel button to close the dialog.");
        }).then(function () {
            cancelButton = AdvancedSettingsPage.popUpDialog.cancelButton();
            return globalUtil.waitForVisibility(cancelButton);
        }).then(function () {
            return cancelButton.click();
        });

    };

    this.resetDefaultAttributeValue = function (AdvancedSettingsPage, EsxuiPage, attribute) {

        return globalUtil.waitForVisibility(attribute).then(function () {
            return attribute.click();
        }).then(function () {
            return racetrack.log("- - Click on the attribute.");
        }).then(function () {
            return globalUtil.waitForVisibility(AdvancedSettingsPage.actionsButton.self());
        }).then(function () {
            return racetrack.log("- - Click Action button and select Reset to Default");
        }).then(function () {
            return AdvancedSettingsPage.actionsButton.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(AdvancedSettingsPage.actionsButton.resetToDefault());
        }).then(function () {
            return AdvancedSettingsPage.actionsButton.resetToDefault().click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        });

    };

};
module.exports = AdvancedSettingsUtil;
