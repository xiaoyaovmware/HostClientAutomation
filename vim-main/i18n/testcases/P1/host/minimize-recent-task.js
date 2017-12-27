'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Minimize Recent Task', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                Minimize Recent Task                                     ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Minimize Recent Task', 'Host', 'Minimize Recent Task', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Minimize_Recent_Task_Start');
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
        return globalUtil.verifyResult('Minimize_Recent_Task_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Minimize Recent Task', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return racetrack.log("Click recent task minimize icon");
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.minimizeRecentTaskButton());
        }).then(function(){
            return EsxuiPage.minimizeRecentTaskButton().click();
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.minimizedRecentTaskButton());
        }).then(function(){
            return racetrack.log("Verify that recent task is minimized");
        }).then(function(){
            return expect(EsxuiPage.minimizedRecentTaskButton().isDisplayed()).toBe(true);
        }).then(function(){
            return racetrack.log("Click the minimized recent task button");
        }).then(function(){
            return EsxuiPage.minimizedRecentTaskButton().click();
        }).then(function(){
            return globalUtil.waitForVisibility(EsxuiPage.recentTaskGrid());
        }).then(function(){
            return racetrack.log("Verify that recent task is displayed again");
        }).then(function(){
            return expect(EsxuiPage.recentTaskGrid().isDisplayed()).toBe(true);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });

});
