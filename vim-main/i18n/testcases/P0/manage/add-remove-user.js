'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var ManagePage = require('../../../../login/esxUI/host/manage/managePage.js');

var SecurityAndUsersPage = require('../../../../login/esxUI/host/manage/securityAndUsers/securityAndUsersPage.js');
var SecurityAndUsersUtil = require('../../../../login/esxUI/host/manage/securityAndUsers/securityAndUsersUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Add Remove User', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil(),
        securityAndUsersUtil = new SecurityAndUsersUtil();


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                 Add Remove User                                                ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Add Remove User', 'Manage', 'Add Remove User', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Add_Remove_User_Start');
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
        })
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Add_Remove_User_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Add Remove User', function () {
        var adduserwizard = SecurityAndUsersPage.adduserButton.adduserwizard;
        var username = 'administrator';
        var description = browser.params.i18n.string;
        var password = 'ca$hc0wA';
        var confirmPassword ='ca$hc0wA';
        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Go to Manage > Security & users tab");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.manageMenu());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return globalUtil.waitForVisibility(ManagePage.securityAndUsersTab());
        }).then(function () {
            return ManagePage.securityAndUsersTab().click();
        }).then(function () {
            return globalUtil.waitForVisibility(SecurityAndUsersPage.usersButton());
        }).then(function () {
            return SecurityAndUsersPage.usersButton().click();
        }).then(function () {
            return racetrack.log("- - Click Users > Add user");
        }).then(function () {
            return globalUtil.waitForVisibility(SecurityAndUsersPage.adduserButton.self());
        }).then(function () {
            return SecurityAndUsersPage.adduserButton.self().click();
        }).then(function () {
            return securityAndUsersUtil.adduser(SecurityAndUsersPage, adduserwizard, username, description, password, confirmPassword);
        }).then(function () {
            // Wait for tasks to appear in recent tasks
            return browser.sleep(Timeout.WAIT_FOR_USER_ADD);
        }).then(function () {
            // Check recent task for add user task
            return racetrack.log("Verify that user is added successfully.");
        }).then(function(){
            // var vmGrid = VMPage.vmGrid;
            return esxuiUtil.checkForRecentTask('Create User', 'root', browser.params.taskMsg.task.state.success, 3);   //modify
        // }).then(function () {
        //     return racetrack.log("Remove user");
        // }).then(function () {
        //     return securityAndUsersUtil.removeuser(SecurityAndUsersPage, username);
        // }).then(function () {
        //     return browser.sleep(Timeout.WAIT_FOR_USER_REMOVE);
        // }).then(function () {
        //     return racetrack.log("Verify that user is removed successfully.");
        // }).then(function(){
        //     return esxuiUtil.checkForRecentTask('Remove User', 'root', browser.params.taskMsg.task.state.success, 3);
        })

    });


});
