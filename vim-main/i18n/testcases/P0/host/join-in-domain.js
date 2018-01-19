'use strict';

var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var ManagePage = require('../../../../login/esxUI/host/manage/managePage.js');
var NetworkingPage = require('../../../../login/esxUI/network/networkingPage.js');

var SecurityAndUsersPage = require('../../../../login/esxUI/host/manage/securityAndUsers/securityAndUsersPage.js');
var SecurityAndUsersUtil = require('../../../../login/esxUI/host/manage/securityAndUsers/securityAndUsersUtil.js');

var TcpIpPage = require('../../../../login/esxUI/network/tcpipStacks/tcpIpPage.js');
var TcpIpUtil = require('../../../../login/esxUI/network/tcpipStacks/tcpIpUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Join In Domain', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        securityAndUsersUtil = new SecurityAndUsersUtil(),
        tcpIpUtil = new TcpIpUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil(),
        hostName = 'AutomationTestHost',
        primaryDNSServer = browser.params.domain.dns,
        searchDomains = browser.params.domain.dns,
        domainName = browser.params.domain.domainName,
        userName = browser.params.domain.user,
        roleName = browser.params.roleName.administrator,
        fullUserName = domainName + '\\' + userName,
        fullHostName = hostName + '.' + domainName,
        passWord = browser.params.domain.password,
        secondaryDNSServer, ipv4Gateway, ipv6Gateway;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                   Join In Domain                                        ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Join In Domain', 'Host', 'Join In Domain', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
         return globalUtil.takeScreenshot(screenshotSavePath, 'Join_In_Domain_Start');
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
        return globalUtil.verifyResult('Join_In_Domain_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Join in domain', function () {
        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log('---------------------------Pre condition: Edit Net Stack---------------------------');
        }).then(function () {
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
            secondaryDNSServer = tcpIpStackInfo[3], ipv4Gateway = tcpIpStackInfo[5], ipv6Gateway = tcpIpStackInfo[6];
            return racetrack.log("Back to TCP/IP stacks tab");
        }).then(function () {
            return EsxuiPage.navigator.networkMenu().click();
        }).then(function () {
            return racetrack.log("Start to edit TcpIpStack Settings");
        }).then(function () {
            return tcpIpUtil.manuallyConfigure(TcpIpPage, EsxuiPage, hostName, domainName, primaryDNSServer,
                secondaryDNSServer, searchDomains, ipv4Gateway, ipv6Gateway);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        }).then(function () {
            return racetrack.log('------------------------------------Join Domain------------------------------------');
        }).then(function () {
            return racetrack.log('Click Manage Menu');
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return racetrack.log('Click Security & Users tab');
        }).then(function () {
            return ManagePage.securityAndUsersTab().click();
        }).then(function () {
            return racetrack.log('Click Authentication button');
        }).then(function () {
            return globalUtil.waitForVisibility(SecurityAndUsersPage.authenticationButton.self())
        }).then(function () {
            return SecurityAndUsersPage.authenticationButton.self().click();
        }).then(function () {
            return racetrack.log('Start to join domain and verify recent task');
        }).then(function () {
            return securityAndUsersUtil.joinInDomainByDomainUser(SecurityAndUsersPage, domainName, userName, passWord)
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_JOIN_DOMAIN);
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Join Domain', fullHostName, browser.params.taskMsg.task.state.success,3)
        }).then(function () {
            return racetrack.log('-------------------------Add domain user administrator role------------------------');
        }).then(function () {
            return racetrack.log("Back to Host page");
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function () {
            return esxuiUtil.assignUserRoles(EsxuiPage, domainName, userName, roleName);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_ELMENT_RENDERING);
        }).then(function () {
            return racetrack.log('------------------------Logout and Re-Login with domain name-----------------------');
        }).then(function () {
            return esxuiUtil.logoutHostClient(LoginPage, EsxuiPage);
        }).then(function () {
            return loginUtil.login(fullUserName, passWord);
        }).then(function () {
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        }).then(function () {
            return racetrack.log('Verify host name changed to be: ' + fullHostName);
        }).then(function () {
            return esxuiUtil.getHostName();
        }).then(function (newHostName) {
            return expect(newHostName).toBe(fullHostName);
        }).then(function () {
            return racetrack.log('Verify logged user name changed to be: ' + fullUserName);
        }).then(function () {
            return EsxuiPage.userDropDown.loggedUserName().getText();
        }).then(function (loggedUserName) {
            return expect(loggedUserName).toContain(userName);
        }).then(function () {
            return racetrack.log('----------------------Initialize environment: Re-Login as Root---------------------');
        }).then(function () {
            return esxuiUtil.logoutHostClient(LoginPage, EsxuiPage);
        }).then(function () {
            return loginUtil.go();
        }).then(function () {
            return esxuiUtil.dismissCEIPDialog(EsxuiPage);
        }).then(function () {
            return racetrack.log('----------------------Initialize environment: Delete User Role---------------------');
        }).then(function () {
            return racetrack.log("Back to Host page");
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function () {
            return racetrack.log("Remove User Role");
        }).then(function () {
            return esxuiUtil.removeUserRoles(EsxuiPage, userName)
        }).then(function () {
            return browser.sleep(3000);
        }).then(function () {
            return racetrack.log('------------------------Initialize environment: Leave Domain-----------------------');
        }).then(function () {
            return racetrack.log('Click Manage Menu');
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return racetrack.log('Click Security & Users tab');
        }).then(function () {
            return ManagePage.securityAndUsersTab().click();
        }).then(function () {
            return racetrack.log('Click Authentication button');
        }).then(function () {
            return globalUtil.waitForVisibility(SecurityAndUsersPage.authenticationButton.self());
        }).then(function () {
            return SecurityAndUsersPage.authenticationButton.self().click();
        }).then(function () {
            return racetrack.log('Leave Domain and verify recent task');
        }).then(function () {
            return securityAndUsersUtil.leaveDomain(SecurityAndUsersPage);
        }).then(function () {
            return browser.sleep(3000);
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Leave Current Domain', fullHostName, browser.params.taskMsg.task.state.success,3)
        }).then(function () {
            return racetrack.log('--------------------Initialize environment: Edit Net Stack Back--------------------');
        }).then(function () {
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
            return tcpIpUtil.selectDHCP(TcpIpPage, EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        });

    });
});
