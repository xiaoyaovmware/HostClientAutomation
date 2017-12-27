'use strict';

var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Change Password', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                Change Password                                          ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Change Password', 'Host', 'Change Password', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Change_Password_Start');
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
        return globalUtil.verifyResult('Change_Password_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Change Password', function () {
        var newpassword = browser.params.login.password;
        var newpasswordagain = browser.params.login.password;
        var changepasswordButton;

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log("Click user name drop down menu and select change password");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.userDropDown.self());
        }).then(function(){
            return EsxuiPage.userDropDown.self().click();
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.userDropDown.logoutMenu());
        }).then(function() {
            return EsxuiPage.userDropDown.changepasswordMenu().click();
        }).then(function () {
            return racetrack.log("Enter new password " + newpassword);
        }).then(function () {
            return EsxuiPage.changepasswordDialog.newpasswordTextBox().sendKeys(newpassword);
        }).then(function () {
            return racetrack.log("Enter new password again " + newpasswordagain);
        }).then(function () {
            return EsxuiPage.changepasswordDialog.newpasswordagainTextBox().sendKeys(newpasswordagain);
        }).then(function () {
            return racetrack.log("Click Change password");
        }).then(function () {
            changepasswordButton = EsxuiPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(changepasswordButton);
        }).then(function () {
            return changepasswordButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        }).then(function () {
            return racetrack.log("Verify that password changed successfuly");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update User', 'root', browser.params.taskMsg.task.state.success, 3);
        })


    });

});
