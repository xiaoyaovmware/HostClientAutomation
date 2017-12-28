'use strict';

var LoginUtil = require('../../../login/loginUtil.js');

var EsxuiPage = require('../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../login/esxUI/esxuiUtil.js');

var HostPage = require('../../../login/esxUI/host/host-page.js');

var GlobalUtil = require('../../../common/globalUtil.js');
var Racetrack = require('../../../common/racetrack.js');

var Timeout = require('../../../common/timeout.js');

describe('Refresh browser with valid session', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        globalUtil = new GlobalUtil();


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                       Refresh browser with valid session                                ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Refresh browser with valid session', 'Host', 'Refresh browser with valid session', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Refresh_browser_with_valid_session_Start');
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
        return globalUtil.verifyResult('Refresh_browser_with_valid_session_Stop', screenshotSavePath).then(function(){
            done();
        });
    });

    it('Refresh browser with valid session', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.navigator.hostMenu.self());
        }).then(function(){
            return EsxuiPage.navigator.hostMenu.self().click();
        }).then(function(){
            return globalUtil.waitForVisibility(HostPage.getHostName());
        }).then(function(){
            return racetrack.log("Verify that browser is refreshed successfully");
        }).then(function() {
            return browser.driver.navigate().refresh();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_REFRESH);
        }).then(function(){
            return expect(HostPage.getHostName().isDisplayed()).toBe(true);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });

});
