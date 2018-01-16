'use strict';


var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var ManagePage = require('../../../../login/esxUI/host/manage/managePage.js');

var SystemPage = require('../../../../login/esxUI/host/manage/system/systemPage.js');
var SystemUtil = require('../../../../login/esxUI/host/manage/system/systemUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Verify System Date And Time', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        systemUtil = new SystemUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                            Verify System Date And Time                                  ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Verify System Date And Time', 'Host', 'Verify System Date And Time', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Verify_System_Date_And_Time_Start');
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function () {
            return racetrack.log('----------------------------Precondition-------------------------------------------------');
        }).then(function () {
            return loginUtil.go();
        }).then(function () {
            return racetrack.log("Dismiss the CEIP dialog");
        }).then(function () {
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        })
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Verify_System_Date_And_Time_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Verify Host System Date and Time is localized', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log('Click Manage Menu');
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return racetrack.log('Click System Tab');
        }).then(function () {
            return ManagePage.systemTab().click();
        }).then(function () {
            return racetrack.log('Click Date & Time Button');
        }).then(function () {
            return SystemPage.timedateButton.self().click();
        }).then(function () {
            return racetrack.log('Verify Current date and time is localized');
        }).then(function () {
            return systemUtil.verifyCurrentDateTime(SystemPage);
        }).then(function () {
            return racetrack.log('Verify NTP Client Status is localized');
        }).then(function () {
            return SystemPage.timedateButton.timeDateGrid.ntpClientStatus().getText();
        }).then(function (clientStatus) {
            return expect(clientStatus).toBe(browser.params.hostMsg.host.manage.system.timeAndDate.ntpd.enabled);
        }).then(function () {
            return racetrack.log('Verify NTP Server Status is localized');
        }).then(function () {
            return SystemPage.timedateButton.timeDateGrid.ntpServicesStatus().getText();
        }).then(function (serverStatus) {
            return expect(serverStatus).toBe(browser.params.hostMsg.host.manage.system.timeAndDate.ntpd.stopped);
        }).then(function () {
            return racetrack.log('Verify NTP Servers is localized');
        }).then(function () {
            return SystemPage.timedateButton.timeDateGrid.ntpServers().getText();
        }).then(function (servers) {
            return expect(servers).toBe(browser.params.hostMsg.host.manage.system.timeAndDate.none);
        })

    });

});
