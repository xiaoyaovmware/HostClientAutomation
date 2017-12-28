'use strict';

var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var AdvancedSettingsPage = require('../../../../login/esxUI/host/manage/advancedSettings/advancedSettingsPage.js');
var PerformancePage = require('../../../../login/esxUI/host/monitor/performance/performancePage.js');
var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var PortGroupPage = require('../../../../login/esxUI/network/portGroup/portGroupPage.js');
var StoragePage = require('../../../../login/esxUI/storage/storagePage.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Navigator Shortcuts', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil(),
        vmName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                Navigator Shortcuts                                      ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Navigator Shortcuts', 'Host', 'Navigator Shortcuts', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Navigator_Shortcuts_Start');
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
        })
    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Navigator_Shortcuts_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Navigator Shortcuts', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log("Click navigator minimize icon to show the shortcuts");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.minimizeButton());
        }).then(function(){
            return EsxuiPage.navigator.minimizeButton().click();
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostButton());
        }).then(function(){
            return racetrack.log("Verify that navigator is minimized and shortcuts button are displayed");
        }).then(function(){
            return expect(EsxuiPage.navigator.hostButton().isDisplayed()).toBe(true);
        }).then(function(){
            return racetrack.log("Click Host Advanced Settings shortcut button");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostAdvSettingButton());
        }).then(function(){
            return EsxuiPage.navigator.hostAdvSettingButton().click();
        }).then(function(){
            return globalUtil.waitForVisibility(AdvancedSettingsPage.editOptionButton());
        }).then(function(){
            return racetrack.log("Verify that Host Advanced Settings page is displayed");
        }).then(function(){
            return expect(AdvancedSettingsPage.editOptionButton().isDisplayed()).toBe(true);
        }).then(function(){
            return racetrack.log("Click Host Monitor shortcut button");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMonitorButton());
        }).then(function(){
            return EsxuiPage.navigator.hostMonitorButton().click();
        }).then(function(){
            return globalUtil.waitForVisibility(PerformancePage.chartDropdown.self());
        }).then(function(){
            return racetrack.log("Verify that Host Monitor page is displayed");
        }).then(function(){
           return expect(PerformancePage.chartDropdown.self().isDisplayed()).toBe(true);
        }).then(function(){
            return racetrack.log("Click VM shortcut button");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.vmButton());
        }).then(function(){
            return EsxuiPage.navigator.vmButton().click();
        }).then(function(){
            return globalUtil.waitForVisibility(VMPage.vmGrid.self());
        }).then(function(){
            return racetrack.log("Verify that VM page is displayed");
        }).then(function(){
            return expect(VMPage.vmGrid.self().isDisplayed()).toBe(true);
        }).then(function(){
            return racetrack.log("Click Networking shortcut button");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.networkButton());
        }).then(function(){
            return EsxuiPage.navigator.networkButton().click();
        }).then(function(){
            return globalUtil.waitForVisibility(PortGroupPage.addPortGroupButton());
        }).then(function(){
            return racetrack.log("Verify that Networking page is displayed");
        }).then(function(){
            return expect(PortGroupPage.addPortGroupButton().isDisplayed()).toBe(true);
        }).then(function(){
            return racetrack.log("Click Datastore shortcut button");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.datastoreButton());
        }).then(function(){
            return EsxuiPage.navigator.datastoreButton().click();
        }).then(function(){
            return globalUtil.waitForVisibility(StoragePage.datastoresTab.newDatastoreButton.self());
        }).then(function(){
            return racetrack.log("Verify that Datastore page is displayed");
        }).then(function(){
            return expect(StoragePage.datastoresTab.newDatastoreButton.self().isDisplayed()).toBe(true);
        }).then(function(){
            return racetrack.log("Click Host shortcut button");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostButton());
        }).then(function(){
            return EsxuiPage.navigator.hostButton().click();
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.rebootHostButton());
        }).then(function(){
            return racetrack.log("Verify that Host page is displayed");
        }).then(function(){
            return expect(EsxuiPage.rebootHostButton().isDisplayed()).toBe(true);
        }).then(function(){
            return racetrack.log("Click the minimized navigator to expand it ");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.minimizedNaviagtorButton());
        }).then(function(){
            return EsxuiPage.navigator.minimizedNaviagtorButton().click();
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function(){
            return racetrack.log("Verify that navigator is expaned and menu are displayed");
        }).then(function(){
            return expect(EsxuiPage.navigator.hostMenu.self().isDisplayed()).toBe(true);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });

});
