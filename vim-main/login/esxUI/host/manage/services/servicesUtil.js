'use strict';

var Timeout = require('../../../../../common/timeout.js');
var GlobalUtil = require('../../../../../common/globalUtil.js');
var globalUtil = new GlobalUtil();
var Racetrack = require('../../../../../common/racetrack.js');
var EsxuiUtil = require('../../../../../login/esxUI/esxuiUtil.js');

var servicesUtil = function () {

    var racetrack = new Racetrack();
    var esxuiUtil = new EsxuiUtil();

    this.stopService = function (ServicesPage, EsxuiPage, serviceName) {

        return globalUtil.waitForVisibility(ServicesPage.vmGrid.getServicesByName(serviceName)).then(function () {
            return racetrack.log("- - Select the service: " + serviceName);
        }).then(function () {
            return ServicesPage.vmGrid.getServicesByName(serviceName).click();
        }).then(function () {
            return racetrack.log("- - Click stop button to stop the running service.");
        }).then(function () {
            return globalUtil.waitForVisibility(ServicesPage.stopButton());
        }).then(function () {
            return ServicesPage.stopButton().click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })
    };

    this.startService = function (ServicesPage, EsxuiPage, serviceName) {

        return globalUtil.waitForVisibility(ServicesPage.vmGrid.getServicesByName(serviceName)).then(function () {
            return racetrack.log("- - Select the service: " + serviceName);
        }).then(function () {
            return ServicesPage.vmGrid.getServicesByName(serviceName).click();
        }).then(function () {
            return racetrack.log("- - Click start button to start the service.");
        }).then(function () {
            return globalUtil.waitForVisibility(ServicesPage.actionButton.self());
        }).then(function () {
            return ServicesPage.actionButton.self().click();
        }).then(function () {
            return globalUtil.waitForVisibility(ServicesPage.actionButton.startMenu());
        }).then(function () {
            return ServicesPage.actionButton.startMenu().click();
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })
    };

    this.restartService = function (ServicesPage, EsxuiPage, serviceName) {

        return globalUtil.waitForVisibility(ServicesPage.vmGrid.getServicesByName(serviceName)).then(function () {
            return racetrack.log("- - Right click the service: " + serviceName);
        }).then(function () {
            return browser.actions().mouseMove(ServicesPage.vmGrid.getServicesByName(serviceName)).perform();
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return racetrack.log("- - Click restart button to start the service.");
        }).then(function () {
            return globalUtil.waitForVisibility(ServicesPage.vmGrid.rightClickContextMenu.restartMenu());
        }).then(function () {
            return ServicesPage.vmGrid.rightClickContextMenu.restartMenu().click()
        }).then(function () {
            return esxuiUtil.dismissAlert(EsxuiPage);
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })
    };

    this.changeServicePolicy = function (ServicesPage, serviceName, servicePolicyName) {

        var servicePolicyLocatorNum = {
            'Start and stop with firewall ports': 0,
            'Start and stop with host': 1,
            'Start and stop manually': 2,
        }, policyMenu;

        return globalUtil.waitForVisibility(ServicesPage.vmGrid.getServicesByName(serviceName)).then(function () {
            return racetrack.log("- - Select the service: " + serviceName);
        }).then(function () {
            return ServicesPage.vmGrid.getServicesByName(serviceName).click();
        }).then(function () {
            return racetrack.log("- - Select Actions > Policy > " + servicePolicyName);
        }).then(function () {
            return globalUtil.waitForVisibility(ServicesPage.actionButton.self());
        }).then(function () {
            return ServicesPage.actionButton.self().click();
        }).then(function () {
            policyMenu = ServicesPage.actionButton.policyMenu;
            return globalUtil.waitForVisibility(policyMenu.self());
        }).then(function () {
            return browser.actions()
                .mouseMove(policyMenu.self())
                .mouseMove(policyMenu.policyName(0))
                .mouseMove(policyMenu.policyName(servicePolicyLocatorNum[servicePolicyName]))
                .click()
                .perform();
        //}).then(function () {
        //    return policyMenu.policyName(servicePolicyLocatorNum[servicePolicyName]).click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })
    };

};
module.exports = servicesUtil;
