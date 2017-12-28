'use strict';
var GlobalUtil = require('../../../../common/globalUtil.js');
var globalUtil = new GlobalUtil();
var Timeout = require('../../../../common/timeout.js');
var Racetrack = require('../../../../common/racetrack.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var TcpIpUtil = function () {

    var racetrack = new Racetrack();
    var esxuiUtil = new EsxuiUtil();

    this.selectManualConfigure = function (TcpIpPage, EsxuiPage) {
        var editTCOIPDialog, saveButton;

        // Click on the first row
        return globalUtil.waitForVisibility(TcpIpPage.tcpIpGrid.getRowDefaultTCPIP()).then(function () {
        }).then(function () {
            return TcpIpPage.tcpIpGrid.getDefaultTCPIPLink().click();
        }).then(function () {
            return racetrack.log("- - Select Default TCP/IP stack and click Edit settings button.");
        }).then(function () {
            return globalUtil.waitForVisibility(TcpIpPage.editSettingsButton());
        }).then(function () {
            return TcpIpPage.editSettingsButton().click();
        }).then(function () {
            return racetrack.log("- - Select Manually Configure radio option and press Save");
        }).then(function () {
            editTCOIPDialog = TcpIpPage.editTCOIPDialog;
            return globalUtil.waitForVisibility(editTCOIPDialog.manuallyConfigureRadioOption());
        }).then(function () {
            return editTCOIPDialog.manuallyConfigureRadioOption().click();
        }).then(function () {
            return globalUtil.waitForVisibility(editTCOIPDialog.searchDomainsTextbox());
        }).then(function () {
            return editTCOIPDialog.searchDomainsTextbox().clear();
        }).then(function () {
            return editTCOIPDialog.searchDomainsTextbox().sendKeys("eng.vmware.com");
        }).then(function () {
            saveButton = TcpIpPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            //Wait for tasks to complete
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        })

    };

    this.selectDHCP = function (TcpIpPage, EsxuiPage) {

        var editTCOIPDialog, saveButton;

        // Click on the first row
        return globalUtil.waitForVisibility(TcpIpPage.tcpIpGrid.getDefaultTCPIPLink()).then(function () {
            return TcpIpPage.tcpIpGrid.getDefaultTCPIPLink().click();
        }).then(function () {
            return racetrack.log("- - Select Default TCP/IP stack and click Edit settings button.");
        }).then(function () {
            return globalUtil.waitForVisibility(TcpIpPage.editSettingsButton());
        }).then(function () {
            return TcpIpPage.editSettingsButton().click();
        }).then(function () {
            return racetrack.log("- - Select Use DHCP radio option and press Save");
        }).then(function () {
            editTCOIPDialog = TcpIpPage.editTCOIPDialog;
            // Select DHCP Configure Radio Option and press ok
            return globalUtil.waitForVisibility(editTCOIPDialog.useDHCPRadioOption());
        }).then(function () {
            return editTCOIPDialog.useDHCPRadioOption().click();
        }).then(function () {
            saveButton = TcpIpPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        })
    };

    this.checkTcpIpSettings = function (TcpIpPage, idToBeChecked) {
        var editTCOIPDialog, cancelButton;

        // Click on the first row
        return globalUtil.waitForVisibility(TcpIpPage.tcpIpGrid.getDefaultTCPIPLink()).then(function () {
            return TcpIpPage.tcpIpGrid.getDefaultTCPIPLink().click();
        }).then(function () {
            return racetrack.log("- - Select Default TCP/IP stack and click Edit settings button.");
        }).then(function () {
            return globalUtil.waitForVisibility(TcpIpPage.editSettingsButton());
        }).then(function () {
            return TcpIpPage.editSettingsButton().click();
        }).then(function () {
            return racetrack.log("- - Verifiy that " + idToBeChecked + " is checked.");
        }).then(function () {
            editTCOIPDialog = TcpIpPage.editTCOIPDialog;
            return globalUtil.waitForVisibility(editTCOIPDialog.manuallyConfigureRadioOption());
        }).then(function () {
            return expect(editTCOIPDialog.getSelectedRadio().getAttribute('id')).toEqual(idToBeChecked);
        }).then(function () {
            return racetrack.log("- - Click Cancel button to close the dialog.");
        }).then(function () {
            cancelButton = TcpIpPage.popUpDialog.cancelButton();
            return globalUtil.waitForVisibility(cancelButton);
        }).then(function () {
            return cancelButton.click();
        })
    };


};
module.exports = TcpIpUtil;
