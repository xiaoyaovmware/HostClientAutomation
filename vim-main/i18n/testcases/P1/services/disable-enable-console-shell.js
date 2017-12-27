'use strict';

var LoginPage = require('../../../../login/loginPage.js');
var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Disable and enable console shell', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        racetrack = new Racetrack(),
        globalUtil = new GlobalUtil(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        hostName;


    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                        Disable and enable console shell                                 ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Disable and enable console shell', 'Services', 'Disable and enable console shell', browser.params.i18n.lang, '', '', 'UI','P1','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Disable_and_enable_console_shell_Start');
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
        return globalUtil.verifyResult('Disable_and_enable_console_shell_Stop', screenshotSavePath).then(function(){
            done();
        });
    });

    it('Disable and enable console shell', function () {

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function () {
            return esxuiUtil.getHostName();
        }).then(function (host) {
            hostName = host;
            return racetrack.log("Disable and enable console shell service");
        }).then(function(){
            return esxuiUtil.disableEnableConsoleShell(EsxuiPage);
        }).then(function () {
            return racetrack.log("Verify that console shell is disabled.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Stop Service', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function(){
            return esxuiUtil.disableEnableConsoleShell(EsxuiPage);
        }).then(function () {
            return racetrack.log("Verify that console shell is enabled.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Start Service', hostName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);
        })

    });

});
