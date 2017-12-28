'use strict';

var LoginUtil = require('../../../login/loginUtil.js');

var EsxuiPage = require('../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../login/esxUI/esxuiUtil.js');

var NetworkingPage = require('../../../login/esxUI/network/networkingPage.js');

var VSwitchPage = require('../../../login/esxUI/network/vSwitch/vswitchPage.js');
var VSwitchUtils = require('../../../login/esxUI/network/vSwitch/vswitchUtil.js');

var PortGroupPage = require('../../../login/esxUI/network/portGroup/portGroupPage.js');
var PortGroupUtil = require('../../../login/esxUI/network/portGroup/portGroupUtil.js');

var ManagementNetworkPage = require('../../../login/esxUI/network/manageNetwork/managementNetworkPage.js');

var GlobalUtil = require('../../../common/globalUtil.js');
var Racetrack = require('../../../common/racetrack.js');

var Timeout = require('../../../common/timeout.js');

describe('Change port group vSwitch', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vswitchUtils = new VSwitchUtils(),
        portGroupUtil = new PortGroupUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName,vSwitchName1,vSwitchName2,portGroupName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                             Change port group vSwitch                                   ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Change port group vSwitch', 'Port Group', 'Change port group vSwitch', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Change_port_group_vSwitch_Start');
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
        }).then(function () {
            return esxuiUtil.getHostName();
        }).then(function (host) {
            hostName = host;
            return globalUtil.waitForVisibility(EsxuiPage.navigator.networkMenu());
        }).then(function () {
            return racetrack.log("Click Networking in esx UI");
        }).then(function () {
            return EsxuiPage.navigator.networkMenu().click();
        }).then(function () {
            return racetrack.log("Click vSwitches tab");
        }).then(function () {
            return globalUtil.waitForVisibility(NetworkingPage.vSwitchTab());
        }).then(function () {
            return NetworkingPage.vSwitchTab().click();
        }).then(function () {
            vSwitchName1 = globalUtil.getTimeStamp();
            return racetrack.log("Create a non-ASCII vSwitch: " + vSwitchName1);
        }).then(function () {
            return vswitchUtils.createVswitch(VSwitchPage, EsxuiPage,vSwitchName1);
        }).then(function () {
            vSwitchName2 = globalUtil.getTimeStamp();
            return racetrack.log("Create second non-ASCII vSwitch: " + vSwitchName2);
        }).then(function () {
            return vswitchUtils.createVswitch(VSwitchPage, EsxuiPage,vSwitchName2);
        }).then(function () {
            return racetrack.log("Create a new non-ASCII Port Group");
        }).then(function () {
            return globalUtil.waitForVisibility(NetworkingPage.portGroupsTab());
        }).then(function () {
            return NetworkingPage.portGroupsTab().click();
        }).then(function () {
            portGroupName = globalUtil.getTimeStamp();
            return portGroupUtil.createPortGroup(PortGroupPage, EsxuiPage, vSwitchName1, portGroupName);
        });

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Change_port_group_vSwitch_Stop',screenshotSavePath).then(function(){
            done();
        });
    });


    it('Change port group vSwitch', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Change the Port Group to a new non-ASCII vSwitch.");
        }).then(function () {
            return portGroupUtil.changePortGroupvSwitch(PortGroupPage, ManagementNetworkPage,portGroupName,vSwitchName2);
        }).then(function () {
            return racetrack.log("Verify that new non-ASCII Port Group vSwitch is changed.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Network Config', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Remove the non-ASCII vSwitchs and Port Group.");
        }).then(function () {
            return portGroupUtil.deletePortGroup(PortGroupPage,portGroupName);
        }).then(function () {
            return globalUtil.waitForVisibility(NetworkingPage.vSwitchTab());
        }).then(function () {
            return NetworkingPage.vSwitchTab().click();
        }).then(function () {
            return vswitchUtils.deleteVswitch(VSwitchPage, vSwitchName1);
        }).then(function () {
            return vswitchUtils.deleteVswitch(VSwitchPage, vSwitchName2);
        });

    });
});