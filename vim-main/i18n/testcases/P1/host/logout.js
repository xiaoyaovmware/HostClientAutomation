'use strict';

var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Logout Host Client', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                Logout Host Client                                       ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Logout Host Client', 'Host', 'Logout Host Client', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Logout_Host_Client_Start');
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
        return globalUtil.verifyResult('Logout_Host_Client_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Logout Host Client', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log("Click user name drop down menu and select logout");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.userDropDown.self());
        }).then(function(){
            return EsxuiPage.userDropDown.self().click();
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.userDropDown.logoutMenu());
        }).then(function() {
            return EsxuiPage.userDropDown.logoutMenu().click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_LOGOUT);
        }).then(function(){
            return racetrack.log("Verify that logout successfully in non-ASCII environment");
        }).then(function(){
            return expect(LoginPage.usernameTextBox().isDisplayed()).toBe(true);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });

});
