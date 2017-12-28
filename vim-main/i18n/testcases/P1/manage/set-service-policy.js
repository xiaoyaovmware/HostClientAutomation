'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var ManagePage = require('../../../../login/esxUI/host/manage/managePage.js');

var ServicesPage = require('../../../../login/esxUI/host/manage/services/servicesPage.js');
var ServicesUtil = require('../../../../login/esxUI/host/manage/services/servicesUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Set service policy', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        servicesUtil = new ServicesUtil(),
        racetrack = new Racetrack(),
        globalUtil = new GlobalUtil(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                  Set service policy                                     ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Set service policy', 'Manage', 'Set service policy', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Set_service_policy_Start');
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
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function () {
            return racetrack.log("Go to Manage > services tab");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.manageMenu());
        }).then(function () {
            return EsxuiPage.navigator.hostMenu.manageMenu().click();
        }).then(function () {
            return globalUtil.waitForVisibility(ManagePage.servicesTab());
        }).then(function () {
            return ManagePage.servicesTab().click();
        });

    });

    afterEach(function (done) {
        return globalUtil.verifyResult('Set_service_policy_Stop', screenshotSavePath).then(function(){
            done();
        });
    });

    it('Set service policy', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Select service DCUI and change service policy to Start and Stop manually in non-ASCII environment");
        }).then(function () {
            return servicesUtil.changeServicePolicy(ServicesPage,'DCUI','Start and stop manually');
        }).then(function () {
            return racetrack.log("Check for recent task and verify that the service policy is updated successfully");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Update Service Policy', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });


});
