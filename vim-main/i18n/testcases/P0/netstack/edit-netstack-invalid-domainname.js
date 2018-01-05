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

describe('Verify error message is localized when netstack domain name is invalid', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        tcpIpUtil = new TcpIpUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName, domainName, primaryDNSServer, secondaryDNSServer, searchDomains, ipv4Gateway, ipv6Gateway;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                           Edit Netstack Invalid DomainName                              ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Edit Netstack Invalid DomainName', 'Netstack', 'Edit Netstack Invalid DomainName', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Edit_Netstack_Invalid_DomainName_Start');
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
        return globalUtil.verifyResult('Edit_Netstack_Invalid_DomainName_Stop',screenshotSavePath).then(function(){
            done();
        });
    });


    it('Input negative domain name and verify invalid message in Edit Netstack', function () {

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
            return tcpIpUtil.getTcpIpStackInfo(TcpIpPage);
        }).then(function (tcpIpStackInfo) {
            hostName = tcpIpStackInfo[0], domainName = tcpIpStackInfo[1], primaryDNSServer = tcpIpStackInfo[2],
                secondaryDNSServer = tcpIpStackInfo[3], searchDomains = tcpIpStackInfo[4],
                ipv4Gateway = tcpIpStackInfo[5], ipv6Gateway = tcpIpStackInfo[6];
            return racetrack.log("Back to TCP/IP stacks tab");
        }).then(function () {
            return EsxuiPage.navigator.networkMenu().click();
        }).then(function () {
            return racetrack.log("Start to edit TcpIpStack Settings");
        }).then(function () {
            var invalidString = browser.params.i18n.string + '"!@#$%^&*(){}[]:;\',./<>?';
            return tcpIpUtil.manuallyConfigure(TcpIpPage, EsxuiPage, hostName, invalidString, primaryDNSServer,
                secondaryDNSServer, 'eng.vmware.com', ipv4Gateway, ipv6Gateway);
        }).then(function () {
            return racetrack.log("Verify invalid message information is localized");
        }).then(function () {
            return TcpIpPage.editTCPIPDialog.invalidMessage().getText();
        }).then(function (invalidMessage_properties) {
            // Since message contains argument {{max}}, so need to deal with this message content and use "toContain"
            var invalidMessage_page = browser.params.networkMsg.network.netstack.edit.error.domainName;
            var invalidMessage_characters = invalidMessage_page.substring(0, invalidMessage_page.length - 8);
            return expect(invalidMessage_properties).toContain(invalidMessage_characters);
        });
    });

});
