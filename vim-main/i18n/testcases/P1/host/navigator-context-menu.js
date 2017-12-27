'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Navigator Context Menu', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil(),
        vmName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                Navigator Context Menu                                   ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Navigator Context Menu', 'Host', 'Navigator Context Menu', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Navigator_Context_Menu_Start');
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
        }).then(function(){
            return racetrack.log("Click Virtual Machines in esx UI");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.vmMenu.self());
        }).then(function(){
            return EsxuiPage.navigator.vmMenu.self().click();
        }).then(function(){
            vmName = globalUtil.getTimeStamp();
            return racetrack.log("Create a new non-ASCII VM with default settings: " + vmName);
        }).then(function() {
            return vmUtil.createVMWithDefaultSettings(VMPage, vmName, EsxuiPage);
        })
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Navigator_Context_Menu_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Navigator context menu', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log("Right click Virtual Machines menu in navigator");
        }).then(function () {
            return browser.actions().mouseMove(EsxuiPage.navigator.vmMenu.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.vmMenu.contextMenu.createVMMenu());
        }).then(function () {
            return racetrack.log("Verify that VM context menu is displayed.");
        }).then(function () {
            return expect(EsxuiPage.navigator.vmMenu.contextMenu.createVMMenu().isDisplayed()).toBe(true);
        }).then(function () {
            return racetrack.log("Click the VM: " + vmName);
        }).then(function () {
            return VMPage.vmGrid.getVMLinkByName(vmName).click();
        }).then(function () {
            return racetrack.log("Right click the VM in navigator");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.vmMenu.getVMByName(vmName));
        }).then(function () {
            return browser.actions().mouseMove(EsxuiPage.navigator.vmMenu.getVMByName(vmName)).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.vmGrid.rightClickContextMenu.editSettingsMenu());
        }).then(function () {
            return racetrack.log("Verify that VM context menu is displayed.");
        }).then(function () {
            return expect(VMPage.vmGrid.rightClickContextMenu.editSettingsMenu().isDisplayed()).toBe(true);
        }).then(function(){
            return racetrack.log("Click Host menu");
        }).then(function(){
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function(){
            return racetrack.log("Verify that Host page is displayed");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.rebootHostButton());
        }).then(function(){
            return expect(EsxuiPage.rebootHostButton().isDisplayed()).toBe(true);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });

});
