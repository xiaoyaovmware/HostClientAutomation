'use strict';


var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');
var Timeout = require('../../../../common/timeout.js');

describe('Reboot host', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                      Reboot Host                                        ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Reboot Host', 'Host', 'Reboot Host', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Reboot_Host_Start');
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
        return globalUtil.verifyResult('Reboot_Host_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Reboot host in non-ASCII environment', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log("Click Reboot button");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.rebootHostButton());
        }).then(function(){
            return EsxuiPage.rebootHostButton().click();
        }).then(function(){
            return racetrack.log("Verifiy Confirm reboot dialog pops up");
        }).then(function () {
            return expect(EsxuiPage.popUpDialog.okButton(0).isPresent()).toBe(true);
        }).then(function () {
            return EsxuiPage.popUpDialog.cancelButton().click();
        }).then(function(){
            return racetrack.log("Reboot host via right-click context menu");
        }).then(function(){
            return esxuiUtil.rebootHost(EsxuiPage);
        }).then(function(){
            return racetrack.log("Login Host Client again.");
        }).then(function () {
            return browser.restart();
        }).then(function () {
            return browser.driver.manage().window().maximize();
        }).then(function () {
            return loginUtil.go();
        }).then(function(){
            return racetrack.log("Verify that host is rebooted successfully");
        }).then(function(){
            return browser.driver.wait(function(){
                return EsxuiPage.recentTaskIcon();
            }, 20000);
        }).then(function(){
            return expect(EsxuiPage.dismissNotificationButton().isDisplayed()).toBe(true);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });

});
