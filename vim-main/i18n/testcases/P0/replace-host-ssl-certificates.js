'use strict';

var LoginUtil = require('../../../login/loginUtil.js');

var EsxuiPage = require('../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../login/esxUI/esxuiUtil.js');

var ManagePage = require('../../../login/esxUI/host/manage/managePage.js');

var SecurityAndUsersPage = require('../../../login/esxUI/host/manage/securityAndUsers/securityAndUsersPage.js');
var SecurityAndUsersUtil = require('../../../login/esxUI/host/manage/securityAndUsers/securityAndUsersUtil.js');

var GlobalUtil = require('../../../common/globalUtil.js');
var Timeout = require('../../../common/timeout.js');
var Racetrack = require('../../../common/racetrack.js');

describe('Replace host SSL certificates', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        securityAndUsersUtil = new SecurityAndUsersUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                             Replace Host SSL Certificates                               ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Replace Host SSL Certificates', 'Manage', 'Replace Host SSL Certificates', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Replace_Host_SSL_Certificates_Start');
        }).then(function() {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function() {
            return racetrack.log('----------------------------Precondition-------------------------------------------------');
        }).then(function(){
            return loginUtil.go();
        }).then(function(){
            return racetrack.log("Dismiss the CEIP dialog");
        }).then(function() {
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        }).then(function() {
            return racetrack.log("Click on Host left menu");
        }).then(function() {
            return EsxuiPage.navigator.hostMenu.self().click();
        });


    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Replace_Host_SSL_Certificates_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Replace host SSL certificates in non-ASCII environment', function () {

        var importCertificateDialog, importButton;

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Go to Management > Security and Users");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.manageMenu());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return globalUtil.waitForVisibility(ManagePage.securityAndUsersTab());
        }).then(function () {
            return ManagePage.securityAndUsersTab().click();
        }).then(function () {
            return racetrack.log("Import the new request");
        }).then(function () {
            return securityAndUsersUtil.importNewCertificate(SecurityAndUsersPage);
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Generate Certificate Signing Request', 'None', browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Check for recent task and verify that new certificate is imported");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Install Server Certificate', 'None', browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });


});
