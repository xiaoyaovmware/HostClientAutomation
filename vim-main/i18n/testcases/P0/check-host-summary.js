'use strict';

var LoginPage = require('../../../common/login.js');
var Timeout = require('../../../common/timeout.js');
var GlobalUtil = require('../../../common/globalUtil.js');
var ClientPage = require('../../../common/client-page.js');
var HostPage = require('../.././host-page.js');

describe('Check non-ASCII Host Summary', function () {
    var loginPage = new LoginPage(),
        globalUtil = new GlobalUtil(),
        clientPage = new ClientPage(),
        hostPage = new HostPage();



    beforeEach(function (done) {

        console.log("-----------------------------------------------------------------------------------------");
        console.log("                                 Check Host Summary                                      ");
        console.log("-----------------------------------------------------------------------------------------");

        browser.driver.manage().window().maximize();

        loginPage.go();
        console.log("Dismiss the CEIP dialog");
        globalUtil.dismissCEIPDialog();

        console.log("Click on Host left menu.");
        globalUtil.waitForVisibility(clientPage.getHostMenu());
        clientPage.getHostMenu().click();

        done();
    });

    afterEach(function (done) {
        return globalUtil.verifyResult().then(function(){
            done();
        });
    });

    it('Check host summary non-ASCII labels and values', function () {

        console.log("Verify that Hostname is present");
        globalUtil.waitForVisibility(hostPage.getHostName());

        console.log("Verify that Version is present");

        console.log("1: "+ browser.params.hostMsg.host.summary.version);
        console.log("2: "+ element(by.css('.key-information .form-horizontal .form-group:nth-child(1) > span')).getText());
        expect(browser.params.hostMsg.host.summary.version).toMatch(element(by.css('.key-information .form-horizontal .form-group:nth-child(1) > span')).getText());
        expect(element(by.css('.key-information .form-horizontal .form-group:nth-child(1) > div > p')).getText()).toBeTruthy();

        console.log("Verify that State is present");
        expect(browser.params.hostMsg.host.summary.state).toMatch(element(by.css('.key-information .form-horizontal .form-group:nth-child(2) > span')).getText());
        expect(element(by.css('.key-information .form-horizontal .form-group:nth-child(2) > div > p')).getText()).toBeTruthy();

        console.log("Verify that Uptime is present");
        expect(browser.params.hostMsg.host.summary.uptime).toMatch(element(by.css('.key-information .form-horizontal .form-group:nth-child(3) > span')).getText());
        expect(element(by.css('.key-information .form-horizontal .form-group:nth-child(3) > div > p')).getText()).toBeTruthy();

        var portlets = element.all(by.css('.vui-portlet .portlet-content > div .vui-stack-view .stack-view-table'));

        console.log("Verify that Hardware is present");
        var hardware = portlets.get(0);
        hardware.element(by.css());

        console.log("Verify that Configuration is present");
        var configuration = portlets.get(1);

        console.log("Verify that System information is present");
        var systemInformation = portlets.get(2);
        //Performance summary last hour
        //var performanceSummart = portlets.get(3);

    });//, Timeout.APPLICATION_TIMEOUT);


});
