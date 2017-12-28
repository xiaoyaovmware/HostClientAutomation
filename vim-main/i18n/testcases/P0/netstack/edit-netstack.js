'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var NetworkingPage = require('../../../../login/esxUI/network/networkingPage.js');

var TcpIpPage = require('../../../../login/esxUI/network/tcpipStacks/tcpIpPage.js');
var TcpIpUtil = require('../../../../login/esxUI/network/tcpipStacks/tcpIpUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Edit netstack in non-ASCII envrionment', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        tcpIpUtil = new TcpIpUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                    Edit netstack                                        ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Edit netstack', 'Netstack', 'Edit netstack', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Edit_netstack_Start');
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
        });

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Edit_netstack_Stop',screenshotSavePath).then(function(){
            done();
        });
    });


    it('Edit netstack use manual and DHCP DNS in non-ASCII environment', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return esxuiUtil.getHostName();
        }).then(function (host) {
            hostName = host;
            return racetrack.log("Click Networking in esx UI");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.networkMenu());
        }).then(function () {
            return EsxuiPage.navigator.networkMenu().click();
        }).then(function () {
            return racetrack.log("Click on TCP/IP stacks tab");
        }).then(function () {
            return globalUtil.waitForVisibility(NetworkingPage.tcpIpStackTab());
        }).then(function () {
            return NetworkingPage.tcpIpStackTab().click();
        }).then(function () {
            return racetrack.log("Select Manually configure");
        }).then(function () {
            return tcpIpUtil.selectManualConfigure(TcpIpPage, EsxuiPage);
        }).then(function () {
            return racetrack.log("Verify that manually configure the netstack successfully.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Network Config', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return EsxuiPage.navigator.networkMenu().click();
        }).then(function () {
            return tcpIpUtil.checkTcpIpSettings(TcpIpPage, 'optionsRadios2');
        }).then(function () {
            return EsxuiPage.navigator.networkMenu().click();
        }).then(function () {
            return racetrack.log("Change the settings back to DHCP");
        }).then(function () {
            return tcpIpUtil.selectDHCP(TcpIpPage, EsxuiPage);
        }).then(function () {
            return racetrack.log("Verify that configuration is revert back to DHCP.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Refresh Network System', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        });

    });

});
