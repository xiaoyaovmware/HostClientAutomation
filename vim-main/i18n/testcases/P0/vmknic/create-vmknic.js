'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var NetworkingPage = require('../../../../login/esxUI/network/networkingPage.js');

var VSwitchPage = require('../../../../login/esxUI/network/vSwitch/vswitchPage.js');
var VSwitchUtils = require('../../../../login/esxUI/network/vSwitch/vswitchUtil.js');

var VmkernelNicPage = require('../../../../login/esxUI/network/vmkernelNIC/vmkernelNicPage.js');
var VmkernelNicUtil = require('../../../../login/esxUI/network/vmkernelNIC/vmkernelNicUtil.js');

var PortGroupPage = require('../../../../login/esxUI/network/portGroup/portGroupPage.js');
var PortGroupUtil = require('../../../../login/esxUI/network/portGroup/portGroupUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Create VMKNIC with non-ASCII name', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vswitchUtils = new VSwitchUtils(),
        vmkernelNicUtil = new VmkernelNicUtil(),
        portGroupUtil = new PortGroupUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName,vSwitchName,portGroupName,vmKernelNicName;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                          Create VMKNIC with non-ASCII name                              ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Create VMKNIC with non-ASCII name', 'VMKNIC', 'Create VMKNIC with non-ASCII name', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Create_VMKNIC_with_non-ASCII_name_Start');
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
        return globalUtil.verifyResult('Create_VMKNIC_with_non-ASCII_name_Stop',screenshotSavePath).then(function(){
            done();
        });
    });


    it('Add a non-ASCII vmkernel-nic and delete', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
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
            // Create and check vswitch
            return racetrack.log("Create a new non-ASCII vSwitch");
        }).then(function () {
            vSwitchName = globalUtil.getTimeStamp();
            return vswitchUtils.createVswitch(VSwitchPage, EsxuiPage, vSwitchName);
        }).then(function () {
            return racetrack.log("Create a non-ASCII VMKNIC");
        }).then(function () {
            return globalUtil.waitForVisibility(NetworkingPage.vmKernelNicTab());
        }).then(function () {
            return NetworkingPage.vmKernelNicTab().click();
        }).then(function () {
            portGroupName = globalUtil.getTimeStamp();
            return vmkernelNicUtil.createVMKernel(VmkernelNicPage, EsxuiPage, vSwitchName, portGroupName);
        }).then(function () {
            return racetrack.log("Check for Recent Tasks and verify new VMKNIC is created");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Network Config', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Check whether the newly added VMKernel is visible and delete it");
        }).then(function () {
            return VmkernelNicPage.vmKernelNicGrid.getAllvmKernelNicRows().count();
        }).then(function (count) {
            //console.log("count: " + count);
            vmKernelNicName = "vmk" + (count-1);
            //console.log ("vmKernelNicName: " + vmKernelNicName);
            return vmkernelNicUtil.deleteVMKernelNic(VmkernelNicPage, EsxuiPage, vmKernelNicName);
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Network Config', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Remove the non-ASCII Port Group.");
        }).then(function () {
            return globalUtil.waitForVisibility(NetworkingPage.portGroupsTab());
        }).then(function () {
            return NetworkingPage.portGroupsTab().click();
        }).then(function () {
            return portGroupUtil.deletePortGroup(PortGroupPage, EsxuiPage, portGroupName);
        }).then(function () {
            return racetrack.log("Remove the non-ASCII vSwitch.");
        }).then(function () {
            return globalUtil.waitForVisibility(NetworkingPage.vSwitchTab());
        }).then(function () {
            return NetworkingPage.vSwitchTab().click();
        }).then(function () {
            return vswitchUtils.deleteVswitch(VSwitchPage, EsxuiPage, vSwitchName);
        });

    });


});
