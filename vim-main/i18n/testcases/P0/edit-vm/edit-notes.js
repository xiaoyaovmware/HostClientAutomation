'use strict';

var LoginUtil = require('../../../../login/loginUtil.js');

var EsxuiPage = require('../../../../login/esxUI/esxuiPage.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var VMPage = require('../../../../login/esxUI/vm/vmPage.js');
var VMUtil = require('../../../../login/esxUI/vm/vmUtil.js');

var GlobalUtil = require('../../../../common/globalUtil.js');
var Racetrack = require('../../../../common/racetrack.js');

var Timeout = require('../../../../common/timeout.js');

describe('Edit Non-ASCII Notes', function () {

    var loginUtil = new LoginUtil(),
        esxuiUtil = new EsxuiUtil(),
        vmUtil = new VMUtil(),
        globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        screenshotSavePath = browser.params.raceTrack.screenshotSavePath,
        vmName, notes;

    beforeEach(function () {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                            Edit non-ASCII notes for VM                                  ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        return racetrack.testCaseBegin('Edit non-ASCII notes for VM', 'Edit VM', 'Edit non-ASCII notes for VM', browser.params.i18n.lang, '', '', 'UI','P0','Automation').then(function(){
            return globalUtil.takeScreenshot(screenshotSavePath, 'Edit_non-ASCII_notes_for_VM_Start');
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
        return globalUtil.verifyResult('Edit_non-ASCII_notes_for_VM_Stop',screenshotSavePath).then(function(){
            done();
        });
    });

    it('Edit non-ASCII notes for non-ASCII VM', function () {

        var cancelButton;

        return racetrack.log('---------------------------------------Start Test Case--------------------------------------').then(function() {
            return racetrack.log("Edit non-ASCII notes for the non-ASCII VM");
        }).then(function () {
            return vmUtil.editVMnotes(VMPage, vmName, browser.params.i18n.string);
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
            return racetrack.log("Verified notes is saved.");
        }).then(function () {
            return expect(notes.getAttribute('value')).toEqual(browser.params.i18n.string);
        }).then(function () {
            cancelButton = VMPage.popUpDialog.cancelButton();
            return globalUtil.waitForVisibility(cancelButton);
        }).then(function () {
            return cancelButton.click();
        }).then(function () {
            return vmUtil.deleteVMFromGridByName(VMPage, vmName);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_VM_DELETE);
        });
    })
});



