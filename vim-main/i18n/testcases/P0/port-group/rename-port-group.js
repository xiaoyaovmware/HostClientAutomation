'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var NetworkingPage = require('../../../../login/esxUI/network/networkingPage.js');

var VSwitchPage = require('../../../../login/esxUI/network/vSwitch/vswitchPage.js');
var VSwitchUtils = require('../../../../login/esxUI/network/vSwitch/vswitchUtil.js');

var PortGroupPage = require('../../../../login/esxUI/network/portGroup/portGroupPage.js');
var PortGroupUtil = require('../../../../login/esxUI/network/portGroup/portGroupUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Rename non-ASCII Port Group', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vswitchUtils = new VSwitchUtils(),
        portGroupUtil = new PortGroupUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName,vSwitchName,portGroupName,newPortGroupName;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                  Rename Port Group                                      ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Rename Port Group', 'Port Group', 'Rename Port Group', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Rename_Port_Group_Start');
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
        }).then(function() {
            return esxuiUtil.getHostName();
        }).then(function (host) {
            hostName = host;
            return globalUtil.waitForVisibility(EsxuiPage.navigator.networkMenu());
        }).then(function () {
            return racetrack.log("Click Networking in esx UI");
        }).then(function () {
            return EsxuiPage.navigator.networkMenu().click();
        }).then(function () {
            return racetrack.log("Click on the vSwitches tab");
        }).then(function () {
            return globalUtil.waitForVisibility(NetworkingPage.vSwitchTab());
        }).then(function () {
            return NetworkingPage.vSwitchTab().click();
        }).then(function () {
            return racetrack.log("Create a new non-ASCII vSwitch");
        }).then(function () {
            vSwitchName = globalUtil.getTimeStamp();
            return vswitchUtils.createVswitch(VSwitchPage,EsxuiPage,vSwitchName);
        }).then(function () {
            return racetrack.log("Create a new non-ASCII Port Group");
        }).then(function () {
            return globalUtil.waitForVisibility(NetworkingPage.portGroupsTab());
        }).then(function () {
            return NetworkingPage.portGroupsTab().click();
        }).then(function () {
            portGroupName = globalUtil.getTimeStamp();
            return portGroupUtil.createPortGroup(PortGroupPage, EsxuiPage, vSwitchName, portGroupName);
        });

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Rename_Port_Group_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Rename a non-ASCII port group and delete', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Rename the Port Group name to " + portGroupName);
        }).then(function () {
            newPortGroupName = browser.params.i18n.string + globalUtil.getTimeStamp();
            return portGroupUtil.renamePortGroup(PortGroupPage, portGroupName, newPortGroupName);
        }).then(function () {
            return racetrack.log("Check for Recent Tasks and verify that port group is renamed successfully");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Network Config', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Check Whether the port group is renamed and delete it");
        }).then(function () {
            return portGroupUtil.deletePortGroup(PortGroupPage, newPortGroupName);
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Network Config', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Remove the non-ASCII vSwitch.");
        }).then(function () {
            return globalUtil.waitForVisibility(NetworkingPage.vSwitchTab());
        }).then(function () {
            return NetworkingPage.vSwitchTab().click();
        }).then(function () {
            return vswitchUtils.deleteVswitch(VSwitchPage, vSwitchName);
        });

    });


});
