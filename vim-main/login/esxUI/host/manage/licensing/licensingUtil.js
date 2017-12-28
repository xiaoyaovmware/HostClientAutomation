'use strict';

var Timeout = require('../../../../../common/timeout.js');
var GlobalUtil = require('../../../../../common/globalUtil.js');
var globalUtil = new GlobalUtil();
var Racetrack = require('../../../../../common/racetrack.js');
var EsxuiUtil = require('../../../../../login/esxUI/esxuiUtil.js');

var LicensingUtil = function () {

    var racetrack = new Racetrack();
    var esxuiUtil = new EsxuiUtil();

    this.assignLicense = function(LicensingPage, EsxuiPage, licenseKey) {
        var assignLicenseDialog, checkLicenseButton, assignLicenseButton;

        return globalUtil.waitForVisibility(LicensingPage.assignLicenseButton.self()).then(function () {
            return LicensingPage.assignLicenseButton.self().click();
        }).then(function () {
            return racetrack.log("- - Click Assign License button")
        }).then(function () {
            assignLicenseDialog = LicensingPage.assignLicenseButton.assignLicenseDialog;
            return globalUtil.waitForVisibility(assignLicenseDialog.licenseTextBox());
        }).then(function () {
            return racetrack.log("- - Enter license")
        }).then(function () {
            return assignLicenseDialog.licenseTextBox().clear();
        }).then(function () {
            return assignLicenseDialog.licenseTextBox().sendKeys(licenseKey);
        }).then(function () {
            return racetrack.log("- - Click Check License > Assign License");
        }).then(function () {
        }).then(function () {
            checkLicenseButton = LicensingPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(checkLicenseButton);
        }).then(function () {
            return checkLicenseButton.click();
        }).then(function () {
            assignLicenseButton = LicensingPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(assignLicenseButton);
        }).then(function () {
            return assignLicenseButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })
    };

    this.removeLicense = function(LicensingPage, EsxuiPage) {
        var removeButton;

        return globalUtil.waitForVisibility(LicensingPage.removeLicenseButton()).then(function () {
            return racetrack.log("- - Click Remove License button");
        }).then(function () {
            return LicensingPage.removeLicenseButton().click();
        }).then(function () {
            return racetrack.log("- - Click Remove to remove the license.");
        }).then(function () {
            removeButton = LicensingPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(removeButton);
        }).then(function () {
            return removeButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })
    };

};
module.exports = LicensingUtil;
