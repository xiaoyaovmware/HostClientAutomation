'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var NetworkingPage = require('../../../../login/esxUI/network/networkingPage.js');

var VSwitchPage = require('../../../../login/esxUI/network/vSwitch/vswitchPage.js');
var VSwitchUtil = require('../../../../login/esxUI/network/vSwitch/vswitchUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Search non-ASCII item', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        vswitchUtil = new VSwitchUtil,
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vSwitchName,vmName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                 Search non-ASCII Item                                   ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Search non-ASCII Item', 'Search', 'Search non-ASCII Item', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Search_non-ASCII_Item_Start');
        }).then(function() {
            return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
        }).then(function() {
            return racetrack.log('----------------------------Precondition-------------------------------------------------');
        }).then(function(){
            return loginUtil.go();
        }).then(function(){
            return racetrack.log("Dismiss the CEIP dialog");
        }).then(function(){
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
        return globalUtil.verifyResult('Search_non-ASCII_Item_Stop', screenshotSavePath).then(function() {
            done();
        });
    });


    it('Search non-ASCII vSwitch VM', function () {


        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Click Networking in esx UI");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.networkMenu());
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
            return vswitchUtil.createVswitch(VSwitchPage, EsxuiPage, vSwitchName);
        }).then(function () {
            return racetrack.log("Search the non-ASCII characters: " + browser.params.i18n.string);
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.searchTextbox.self());
        }).then(function () {
            return EsxuiPage.searchTextbox.self().sendKeys(browser.params.i18n.string);
        }).then(function () {
            return EsxuiPage.searchTextbox.self().sendKeys(protractor.Key.ENTER);
        }).then(function () {
            return browser.sleep(5000);
        }).then(function () {
            return racetrack.log("Verify that the non-ASCII VM and vSwitch is list in search result.");
        }).then(function () {
            return EsxuiPage.searchTextbox.getAllSearchResults().then(function (results) {
                results.forEach(function (result) {
                    return result.getText().then(function (resultName) {
                        //console.log(resultName);
                        if (resultName.indexOf(browser.params.hostMsg.host.summary.portlets.hardware.networking.list.columns.vms) > -1) {
                            //console.log('vm')
                            return expect(resultName).toContain(vmName);
                        }
                        if (resultName.indexOf(browser.params.hostMsg.host.summary.portlets.hardware.networking.networks) > -1) {
                            //console.log('Net')
                            return expect(resultName).toContain(vSwitchName);
                        }
                    })
                })
            });
        }).then(function () {
            return EsxuiPage.searchTextbox.self().clear();
        }).then(function () {
            return vswitchUtil.deleteVswitch(VSwitchPage,EsxuiPage,vSwitchName);
        })

    });


});
