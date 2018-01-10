'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var NetworkingPage = require('../../../../login/esxUI/network/networkingPage.js');

var VSwitchPage = require('../../../../login/esxUI/network/vSwitch/vswitchPage.js');
var VSwitchUtils = require('../../../../login/esxUI/network/vSwitch/vswitchUtil.js');

var VmkernelNicPage = require('../../../../login/esxUI/network/vmkernelNIC/vmkernelNicPage.js');
var VmkernelNicUtil = require('../../../../login/esxUI/network/vmkernelNIC/vmkernelNicUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Create VMKNIC with invalid ipv6 does not succeed and verify the fail message', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vswitchUtils = new VSwitchUtils(),
        vmkernelNicUtil = new VmkernelNicUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName,vSwitchName,portGroupName,vmKernelNicName,ipv6address,ipv6prefix;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                               Create VMKNIC Invalid IPv6                                ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Create VMKNIC Invalid IPv6', 'VMKNIC', 'Create VMKNIC Invalid IPv6', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Create_VMKNIC_Invalid_IPv6_Start');
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
        return globalUtil.verifyResult('Create_VMKNIC_Invalid_IPv6_Stop',screenshotSavePath).then(function(){
            done();
        });
    });


    it('Create VMKNIC with invalid ipv6 does not succeed and verify the fail message', function () {

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
            ipv6address = '!@#$%^&*()_++~{}:?';
            ipv6prefix = '';
            return vmkernelNicUtil.createIPv6VMKernel(VmkernelNicPage, EsxuiPage, vSwitchName, portGroupName, ipv6address, ipv6prefix);
        }).then(function () {
            return racetrack.log("Verify notification pops up and its content is localized");
        }).then(function () {
            return VmkernelNicPage.notificationLabel().getText();
        }).then(function (notificationLabelContent) {
            var invalidMessage = browser.params.networkMsg.network.vmknic.add.dialog.notification.error;
            return expect(notificationLabelContent).toBe(invalidMessage);
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return racetrack.log("Check for Recent Tasks and verify new VMKNIC failed to be created");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Network Config', hostName, browser.params.taskMsg.task.state.error, 3);
        }).then(function () {
            return racetrack.log("Check no new VMKernelNic was added and there is only one default VMKernelNic vmk0");
        }).then(function () {
            return VmkernelNicPage.vmKernelNicGrid.getAllvmKernelNicRows().count();
        }).then(function (count) {
            vmKernelNicName = "vmk" + count;
            return expect(VmkernelNicPage.vmKernelNicGrid.getVMKernelNicLinkByName(vmKernelNicName).isPresent()).toBe(false);
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
