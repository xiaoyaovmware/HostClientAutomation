'use strict';

var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var HostPage = require('../../../../login/esxUI/host/host-page.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Login Host Client with IPv6', function () {

    var loginUtil = new LoginUtil(),
        racetrack = new Racetrack(),
        esxuiUtil = new EsxuiUtil(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil(),
        hostName, ipv6Address, ipv6URL;


    beforeEach(function (done) {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                    IPv6 Login                                           ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('IPv6 Login', 'Security', 'IPv6 Login', browser.params.i18n.lang, '', '', 'UI', 'P0', 'Automation').then(function () {
            return globalUtil.takeScreenshot(screenshotSavePath, 'IPv6_Login_Start');
        }).then(function() {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function() {
            done();
        });
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('IPv6_Login_Stop',screenshotSavePath).then(function () {
            done();
        });
    });

    it('IPv6 Login', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return loginUtil.init();
        }).then(function () {
            return racetrack.log("Login Host Client");
        }).then(function () {
            return loginUtil.login();
        }).then(function () {
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        }).then(function () {
            return esxuiUtil.getHostName();
        }).then(function (host1) {
            hostName = host1;
            return racetrack.log("Get hostname is: " + hostName);
        }).then(function () {
            return HostPage.hardwareGrid.networking.ipv6Address().getText();
        }).then(function (ipv6) {
            ipv6Address = ipv6.substring(9, ipv6.length);
            ipv6URL = 'https://[' +  ipv6Address + ']/ui';
            return racetrack.log("Get IPv6 URL: " + ipv6URL);
        }).then(function () {
            return racetrack.log("Click User dropdown and click logout menu to logout");
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
            return racetrack.log("Launch HostClient with IPv6 URL");
        }).then(function () {
            browser.driver.get(ipv6URL);
            browser.manage().timeouts().pageLoadTimeout(120000);
            browser.manage().timeouts().implicitlyWait(180000);
            return browser.driver.wait(function(){
                return LoginPage.usernameTextBox();
            }, 20000);
        }).then(function () {
            return racetrack.log("Advance to login page and login");
        }).then(function () {
            var username = browser.params.login.user,
                password = browser.params.login.password;
            return loginUtil.login(username, password);
        }).then(function () {
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        }).then(function () {
            return racetrack.log("Login to Host page and verify hostName is consistent with it via IPv4 login");
        }).then(function () {
            return esxuiUtil.getHostName();
        }).then(function (host2) {
            return expect(host2).toBe(hostName);
        });
    });

});
