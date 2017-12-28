'use strict';

var GlobalUtil = require('../common/globalUtil.js');
var globalUtil = new GlobalUtil();

var HostUtil = function () {



    this.assignLicense = function (hostPage, licenseKey) {

        return globalUtil.waitForVisibility(hostPage.getAssignLicenseButton()).then(function () {
            return hostPage.getAssignLicenseButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(hostPage.getLicenseInputTextBox());
        }).then(function () {
            return hostPage.getLicenseInputTextBox().clear();
        }).then(function () {
            return hostPage.getLicenseInputTextBox().sendKeys(licenseKey);
        }).then(function () {
            return globalUtil.waitForVisibility(hostPage.getCheckLicneseButton());
        }).then(function () {
            return hostPage.getCheckLicneseButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(hostPage.getCheckLicneseButton());
        }).then(function () {
            return hostPage.getCheckLicneseButton().click();
        })
    };

    this.importNewCertificate = function (hostPage) {

        return globalUtil.waitForVisibility(hostPage.getCertificatesButton()).then(function () {
            return hostPage.getCertificatesButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(hostPage.getImportNewCertificateButton());
        }).then(function () {
            return hostPage.getImportNewCertificateButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(hostPage.getGenerateFQDNSigningRequestButton());
        }).then(function () {
            return hostPage.getGenerateFQDNSigningRequestButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(hostPage.getCertificateSigningRequestResultTitle());
        }).then(function () {
            return browser.actions().doubleClick(hostPage.getCertificateSigningRequestResultTitle()).perform();
        }).then(function () {
            return globalUtil.waitForVisibility(hostPage.getCopyToClipBoardButton());
        }).then(function () {
            return hostPage.getCopyToClipBoardButton().click();
        }).then(function () {
            return globalUtil.waitForVisibility(hostPage.getCloseButton());
        }).then(function () {
            return hostPage.getCloseButton().click();
        })
    };


    this.joinInDomain = function (hostPage, domainName, userName, password) {

        hostPage.getAuthenticationButton().click();
        expect(hostPage.getJoinDomainButton().isDisplayed()).toBe(true);
        hostPage.getJoinDomainButton().click();
        expect(hostPage.getDomainNameInputTextBox().isDisplayed()).toBe(true);
        hostPage.getDomainNameInputTextBox().sendKeys(domainName);
        hostPage.getUserNameInputTextBox().sendKeys(userName);
        hostPage.getPasswordInputTextBox().sendKeys(password);
        hostPage.getConfirmPasswordInputTextBox().sendKeys(password);

        hostPage.getJoinDomainDialogButton().click();

    }

};
module.exports = HostUtil;
