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

describe('Verify error message is localized when netstack host name is invalid', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        tcpIpUtil = new TcpIpUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName, domainName, primaryDNSServer, searchDomains, ipv4Gateway, ipv6Gateway;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                               Message Invalid HostName                                  ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Message Invalid HostName', 'Netstack', 'Message Invalid HostName', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Message_Invalid_HostName_Start');
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
        return globalUtil.verifyResult('Message_Invalid_HostName_Stop',screenshotSavePath).then(function(){
            done();
        });
    });


    it('Input negative host name and verify invalid message in Edit Netstack', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
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
            return racetrack.log("Select Default TCP/IP stack");
        }).then(function () {
            return globalUtil.waitForVisibility(TcpIpPage.tcpIpGrid.getRowDefaultTCPIP());
        }).then(function () {
            return TcpIpPage.tcpIpGrid.getDefaultTCPIPLink().click();
        }).then(function () {
            return racetrack.log("Click Edit settings button");
        }).then(function () {
            return globalUtil.waitForVisibility(TcpIpPage.editSettingsButton());
        }).then(function () {
            return TcpIpPage.editSettingsButton().click();
        }).then(function () {
            return TcpIpPage.editTCPIPDialog.manuallyConfigureRadioOption().click();
        }).then(function () {
            return globalUtil.waitForVisibility(TcpIpPage.editTCPIPDialog.searchDomainsTextbox());
        }).then(function () {
            return racetrack.log("Get default value of all textbox");
        }).then(function () {
            return TcpIpPage.editTCPIPDialog.getHostName();
        }).then(function (host) {
            hostName = host;
            return TcpIpPage.editTCPIPDialog.getDomainName();
        }).then(function (domain) {
            domainName = domain;
            return TcpIpPage.editTCPIPDialog.getPrimaryDNSServer();
        }).then(function (primaryDNS) {
            primaryDNSServer = primaryDNS;
            return TcpIpPage.editTCPIPDialog.getSearchDomains();
        }).then(function (search) {
            searchDomains = search;
            return TcpIpPage.editTCPIPDialog.getIpv4Gateway();
        }).then(function (ipv4) {
            ipv4Gateway = ipv4;
            return TcpIpPage.editTCPIPDialog.getIpv6Gateway();
        }).then(function (ipv6) {
            ipv6Gateway = ipv6;
            return racetrack.log("Click Cancel button to close the Edit dialog");
        }).then(function () {
            return TcpIpPage.popUpDialog.cancelButton().click();
        }).then(function () {
            return racetrack.log("Back to TCP/IP stacks tab");
        }).then(function () {
            return EsxuiPage.navigator.networkMenu().click();
        }).then(function () {
            return racetrack.log("Start to edit TcpIpStack Settings");
        }).then(function () {
            var invalidString = browser.params.i18n.string + '"!@#$%^&*(){}[]:;\',./<>?';
            return tcpIpUtil.manuallyConfigure(TcpIpPage, EsxuiPage, invalidString, primaryDNSServer, 'eng.vmware.com', 'eng.vmware.com', ipv4Gateway, ipv6Gateway);
        }).then(function () {
            return racetrack.log("Verify invalid message information is localized");
        }).then(function () {
            return TcpIpPage.editTCPIPDialog.invalidMessage().getText();
        }).then(function (invalidMessage_properties) {
            // Since message contains argument {{max}}, so need to deal with this message content and use "toContain"
            var invalidMessage_page = browser.params.networkMsg.network.netstack.edit.error.hostName;
            var invalidMessage_characters = invalidMessage_page.substring(0, invalidMessage_page.length - 8);
            return expect(invalidMessage_properties).toContain(invalidMessage_characters);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        });
    });

});
