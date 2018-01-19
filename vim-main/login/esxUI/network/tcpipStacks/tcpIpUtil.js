'use strict';
var GlobalUtil = require('../../../../common/globalUtil.js');
var globalUtil = new GlobalUtil();
var Timeout = require('../../../../common/timeout.js');
var Racetrack = require('../../../../common/racetrack.js');
var EsxuiUtil = require('../../../../login/esxUI/esxuiUtil.js');

var TcpIpUtil = function () {

    var racetrack = new Racetrack();
    var esxuiUtil = new EsxuiUtil();
    var hostName, domainName, primaryDNSServer, secondaryDNSServer, searchDomains, ipv4Gateway, ipv6Gateway, tcpIpStackInfo;

    this.selectManualConfigure = function (TcpIpPage, EsxuiPage) {
        var editTCPIPDialog, saveButton;

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
            editTCPIPDialog = TcpIpPage.editTCPIPDialog;
            return globalUtil.waitForVisibility(editTCPIPDialog.manuallyConfigureRadioOption());
        }).then(function () {
            return editTCPIPDialog.manuallyConfigureRadioOption().click();
        }).then(function () {
            return globalUtil.waitForVisibility(editTCPIPDialog.searchDomainsTextbox());
        }).then(function () {
            return editTCPIPDialog.domainNameTextbox().clear();
        }).then(function () {
            return editTCPIPDialog.domainNameTextbox().sendKeys("eng.vmware.com");
        }).then(function () {
            return editTCPIPDialog.searchDomainsTextbox().clear();
        }).then(function () {
            return editTCPIPDialog.searchDomainsTextbox().sendKeys("eng.vmware.com");
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

        var editTCPIPDialog, saveButton;

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
            editTCPIPDialog = TcpIpPage.editTCPIPDialog;
            // Select DHCP Configure Radio Option and press ok
            return globalUtil.waitForVisibility(editTCPIPDialog.useDHCPRadioOption());
        }).then(function () {
            return editTCPIPDialog.useDHCPRadioOption().click();
        }).then(function () {
            saveButton = TcpIpPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        })
    };

    this.getTcpIpStackInfo = function (TcpIpPage) {

        return racetrack.log("- - Select Default TCP/IP stack").then(function () {
            // Click on the first row
            return globalUtil.waitForVisibility(TcpIpPage.tcpIpGrid.getRowDefaultTCPIP());
        }).then(function () {
            return TcpIpPage.tcpIpGrid.getDefaultTCPIPLink().click();
        }).then(function () {
            return racetrack.log("- - Click Edit settings button");
        }).then(function () {
            return globalUtil.waitForVisibility(TcpIpPage.editSettingsButton());
        }).then(function () {
            return TcpIpPage.editSettingsButton().click();
        }).then(function () {
            return racetrack.log("- - Select Manually Configure radio option");
        }).then(function () {
            return globalUtil.waitForVisibility(TcpIpPage.editTCPIPDialog.manuallyConfigureRadioOption());
        }).then(function () {
            return TcpIpPage.editTCPIPDialog.manuallyConfigureRadioOption().click();
        }).then(function () {
            return globalUtil.waitForVisibility(TcpIpPage.editTCPIPDialog.searchDomainsTextbox());
        }).then(function () {
            return racetrack.log("- - Get default value of all textbox");
        }).then(function () {
            return TcpIpPage.editTCPIPDialog.getHostName();
        }).then(function (host) {
            hostName = host;
            return TcpIpPage.editTCPIPDialog.getDomainName();
        }).then(function (domain) {
            domainName = domain;
            return TcpIpPage.editTCPIPDialog.getPrimaryDNSServer();
        }).then(function (primaryDNS) {
            primaryDNSServer = primaryDNS;
            return TcpIpPage.editTCPIPDialog.getSecondaryDNSServer();
        }).then(function (secondaryDNS) {
            secondaryDNSServer = secondaryDNS;
            return TcpIpPage.editTCPIPDialog.getSearchDomains();
        }).then(function (search) {
            searchDomains = search;
            return TcpIpPage.editTCPIPDialog.getIpv4Gateway();
        }).then(function (ipv4) {
            ipv4Gateway = ipv4;
            return TcpIpPage.editTCPIPDialog.getIpv6Gateway();
        }).then(function (ipv6) {
            ipv6Gateway = ipv6;
            return racetrack.log("- - Close Edit TCP/IP configuration dialog");
        }).then(function () {
            return TcpIpPage.popUpDialog.cancelButton().click();
        }).then(function () {
            return tcpIpStackInfo = [hostName,domainName,primaryDNSServer,secondaryDNSServer,searchDomains,ipv4Gateway,ipv6Gateway];
        })
    };

    this.manuallyConfigure = function (TcpIpPage, EsxuiPage, HostName, DomainName, PrimaryDNSServer,
                                       SecondaryDNSServer, SearchDomains, ipv4Gateway, ipv6Gateway) {
        var editTCPIPDialog, saveButton;

        return racetrack.log("- - Select Default TCP/IP stack").then(function () {
            // Click on the first row
            return globalUtil.waitForVisibility(TcpIpPage.tcpIpGrid.getRowDefaultTCPIP());
        }).then(function () {
            return TcpIpPage.tcpIpGrid.getDefaultTCPIPLink().click();
        }).then(function () {
            return racetrack.log("- - Click Edit settings button");
        }).then(function () {
            return globalUtil.waitForVisibility(TcpIpPage.editSettingsButton());
        }).then(function () {
            return TcpIpPage.editSettingsButton().click();
        }).then(function () {
            return racetrack.log("- - Select Manually Configure radio option");
        }).then(function () {
            editTCPIPDialog = TcpIpPage.editTCPIPDialog;
            return globalUtil.waitForVisibility(editTCPIPDialog.manuallyConfigureRadioOption());
        }).then(function () {
            return editTCPIPDialog.manuallyConfigureRadioOption().click();
        }).then(function () {
            return globalUtil.waitForVisibility(editTCPIPDialog.searchDomainsTextbox());
        }).then(function () {
            return racetrack.log("- - Input HostName");
        }).then(function () {
            return editTCPIPDialog.hostNameTextbox().clear();
        }).then(function () {
            return editTCPIPDialog.hostNameTextbox().sendKeys(HostName);
        }).then(function () {
            return racetrack.log("- - Input DomainName");
        }).then(function () {
            return editTCPIPDialog.domainNameTextbox().clear();
        }).then(function () {
            return editTCPIPDialog.domainNameTextbox().sendKeys(DomainName);
        }).then(function () {
            return racetrack.log("- - Input PrimaryDNSServer");
        }).then(function () {
            return editTCPIPDialog.primaryDNSServerTextbox().clear();
        }).then(function () {
            return editTCPIPDialog.primaryDNSServerTextbox().sendKeys(PrimaryDNSServer);
        }).then(function () {
            return racetrack.log("- - Input SecondaryDNSServer");
        }).then(function () {
            return editTCPIPDialog.secondaryDNSServerTextbox().clear();
        }).then(function () {
            return editTCPIPDialog.secondaryDNSServerTextbox().sendKeys(SecondaryDNSServer);
        }).then(function () {
            return racetrack.log("- - Input SearchDomains");
        }).then(function () {
            return editTCPIPDialog.searchDomainsTextbox().clear();
        }).then(function () {
            return editTCPIPDialog.searchDomainsTextbox().sendKeys(SearchDomains);
        }).then(function () {
            return racetrack.log("- - Input ipv4Gateway");
        }).then(function () {
            return editTCPIPDialog.ipv4GatewayTextbox().clear();
        }).then(function () {
            return editTCPIPDialog.ipv4GatewayTextbox().sendKeys(ipv4Gateway);
        }).then(function () {
            return racetrack.log("- - Input ipv6Gateway");
        }).then(function () {
            return editTCPIPDialog.ipv6GatewayTextbox().clear();
        }).then(function () {
            return editTCPIPDialog.ipv6GatewayTextbox().sendKeys(ipv6Gateway);
        }).then(function () {
            saveButton = TcpIpPage.popUpDialog.okButton();
            return globalUtil.waitForVisibility(saveButton);
        }).then(function () {
            return racetrack.log("- - Click Save button");
        }).then(function () {
            return saveButton.click();
        }).then(function () {
            //Wait for tasks to complete
            return browser.sleep(Timeout.WAIT_FOR_NETWORK_TASK);
        })

    };

    this.checkTcpIpSettings = function (TcpIpPage, idToBeChecked) {
        var editTCPIPDialog, cancelButton;

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
            editTCPIPDialog = TcpIpPage.editTCPIPDialog;
            return globalUtil.waitForVisibility(editTCPIPDialog.manuallyConfigureRadioOption());
        }).then(function () {
            return expect(editTCPIPDialog.getSelectedRadio().getAttribute('id')).toEqual(idToBeChecked);
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
