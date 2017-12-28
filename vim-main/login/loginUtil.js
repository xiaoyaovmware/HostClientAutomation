'use strict';

var LoginPage = require('../login/loginPage.js');
var GlobalUtil = require('../common/globalUtil.js');
var Racetrack = require('../common/racetrack.js');

var LoginUtil = function () {

    var globalUtil = new GlobalUtil(),
        racetrack = new Racetrack(),
        self = this;

    this.go = function (_username, _password) {

        //this.init();
        //this.login();
        return self.init().then(function(){
            return self.login(_username, _password);
        }).then(function() {
            return racetrack.log("Login Host Client with username and password: " + browser.params.login.user + " " + browser.params.login.password);
        })

    },

    this.init = function () {

        browser.driver.get(browser.baseUrl);

        browser.manage().timeouts().pageLoadTimeout(120000);
        browser.manage().timeouts().implicitlyWait(180000);

        return browser.driver.wait(function(){
            return LoginPage.usernameTextBox();
        }, 20000);

    },

    this.login = function (_username, _password) {

        _username = _username || browser.params.login.user;
        _password = _password || browser.params.login.password;

        return LoginPage.usernameTextBox().clear().then(function(){
            return browser.sleep(3000);
        }).then(function(){
            return globalUtil.waitForVisibility(LoginPage.passwordTextBox());
        }).then(function(){
            return LoginPage.passwordTextBox().clear();
        }).then(function(){
            return LoginPage.usernameTextBox().sendKeys(_username);
        }).then(function(){
            return LoginPage.passwordTextBox().sendKeys(_password);
        }).then(function(){
            return globalUtil.waitForVisibility(LoginPage.submitButton());
        }).then(function(){
            return LoginPage.submitButton().click();
        })
    }

};
module.exports = LoginUtil;
