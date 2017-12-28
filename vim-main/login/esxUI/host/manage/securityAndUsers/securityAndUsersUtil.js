'use strict';


var GlobalUtil = require('../../../../../common/globalUtil.js');
var globalUtil = new GlobalUtil();
var Racetrack = require('../../../../../common/racetrack.js');
var Timeout = require('../../../../../common/timeout.js');

var securityAndUsersUtil = function () {

    var racetrack = new Racetrack();

    this.importNewCertificate = function (SecurityAndUsersPage) {

        var importCertificateDialog, importButton;

        return globalUtil.waitForVisibility(SecurityAndUsersPage.certificatesButton()).then(function () {
            return SecurityAndUsersPage.certificatesButton().click();
        }).then(function () {
            return racetrack.log("- - Click Certificates > Import new certificate.");
        }).then(function () {
            return globalUtil.waitForVisibility(SecurityAndUsersPage.importNewCertificateButton());
        }).then(function () {
            return SecurityAndUsersPage.importNewCertificateButton().click();
        }).then(function () {
            return racetrack.log("- - Paste the certificate and click Import button");
        }).then(function () {
            importCertificateDialog = SecurityAndUsersPage.importCertificateDialog;
            return globalUtil.waitForVisibility(importCertificateDialog.getCSRTextArea());
        }).then(function () {
            return importCertificateDialog.getCSRTextArea().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "v"));
        }).then(function () {
            importButton = SecurityAndUsersPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(importButton);
        }).then(function () {
            return importButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })
    };

    this.adduser = function (SecurityAndUsersPage,adduserwizard,username,description,password,confirmPassword) {
        return globalUtil.waitForVisibility(adduserwizard.usernameTextBox()).then(function(){
            return racetrack.log("- - Enter user name: " + username);
        }).then(function () {
            return adduserwizard.usernameTextBox().sendKeys(username);
        }).then(function () {
            return racetrack.log("- - Enter Description: " + description);
        }).then(function () {
            return adduserwizard.descriptionTextBox().sendKeys(description);
        }).then(function () {
            return racetrack.log("- - Enter Password: " + password);
        }).then(function () {
            return adduserwizard.passwordTextBox().sendKeys(password);
        }).then(function () {
            return racetrack.log("- - Enter confirmPassword: " + confirmPassword);
        }).then(function () {
            return adduserwizard.confirmpasswordTextBox().sendKeys(confirmPassword);
        }).then(function () {
            return globalUtil.waitForVisibility(SecurityAndUsersPage.popUpDialog.okButton());
        }).then(function () {
            return SecurityAndUsersPage.popUpDialog.okButton().click();
        }).then(function(){
            // Wait for user to be created
            return browser.sleep(Timeout.WAIT_FOR_USER_ADD);
            // }).then(function() {
            //     return globalUtil.waitForVisibility(SecurityAndUsersPage.RefreshButton());
            // }).then(function(){
            //     return racetrack.log("- - Refresh user");
            // }).then(function () {
            //     return SecurityAndUsersPage.RefreshButton().click();
            // }).then(function(){
            //     return browser.sleep(Timeout.WAIT_FOR_REFRESH);
        });

    };

    this.removeuser = function (SecurityAndUsersPage, username) {

        var userGrid = SecurityAndUsersPage.userGrid, confirmDeleteButton;

        return globalUtil.waitForVisibility(SecurityAndUsersPage.refreshButton()).then(function(){
            return racetrack.log("- - Click Refresh button");
        }).then(function () {
            return SecurityAndUsersPage.refreshButton().click();
        }).then(function(){
            return racetrack.log("- - Select user: " + username);
        }).then(function () {
            return globalUtil.waitForVisibility(userGrid.getuserLinkByName(username));
        }).then(function(){
            return userGrid.getuserLinkByName(username).click();
        }).then(function(){
            return racetrack.log("- - Select Remove user menu");
        }).then(function(){
            return globalUtil.waitForVisibility(userGrid.removeuserButton());
        }).then(function(){
            return userGrid.removeuserButton().click();
        }).then(function(){
            confirmDeleteButton = SecurityAndUsersPage.popUpDialog.okButton(0);
                // VMPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(confirmDeleteButton);
        }).then(function() {
            //Click on Delete
            return confirmDeleteButton.click();
        });
    }



};
module.exports = securityAndUsersUtil;
