'use strict';

var Timeout = require('../common/timeout.js');
var Racetrack = require('../common/racetrack.js');
var fs = require('fs');
var Q = require('q');

var GlobalUtil = function () {

    var racetrack = new Racetrack(),
        self = this;

    this.waitForVisibility = function (component) {

        return browser.sleep(1000).then(function() {
            return browser.wait(function () {
                return component.isPresent();
            }, Timeout.COMPONENT_TIMEOUT);
        }).then(function () {
            return browser.wait(function () {
                return component.isDisplayed();
            }, Timeout.COMPONENT_TIMEOUT);
        }).then(function () {
            return browser.wait(function () {
                return component.isEnabled();
            }, Timeout.COMPONENT_TIMEOUT);
        });
    },

    this.getTimeStamp = function () {
        var currentDate = new Date();
        var timeStamp = browser.params.i18n.string + '_' + currentDate.getHours() + '_' + currentDate.getMinutes() + '_' + currentDate.getSeconds();
        return timeStamp;
    };

    this.takeScreenshot = function (path, name) {

        return browser.driver.takeScreenshot().then(function (png) {

            var deferred = Q.defer();

            var screenshotPath = path + name + '.png';
            console.log("screenshotPath: " + screenshotPath);

            var stream = fs.createWriteStream(screenshotPath);
            stream.write(new Buffer(png, 'base64'), function (err) {
                if (err) {
                    return console.log('Take screenshot error: ' + err);
                }
                console.log('Screenshot write to disk');
                stream.end();
                deferred.resolve(true);
            });
            return deferred.promise;
        });
    };

    this.verifyResult = function(testCaseName,screenshotSavePath){
        if (browser.params.raceTrack.testCaseResult === 'PASS') {
            return racetrack.verify("", true, true).then(function(){
                return racetrack.testCaseEnd('PASS');
            }).then(function() {
                return self.takeScreenshot(screenshotSavePath, testCaseName+'_Pass');
            }).then(function() {
                return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
            })
        }else{
            return racetrack.verify("", false, true).then(function() {
                return racetrack.testCaseEnd('FAIL');
            }).then(function(){
                return browser.params.raceTrack.testCaseResult = 'PASS'
            }).then(function() {
                return self.takeScreenshot(screenshotSavePath, testCaseName+'_Fail');
            }).then(function() {
                return browser.sleep(Timeout.WAIT_FOR_START_STOP_VIDEO_RECORDING);
            })
        }
    }

    this.refreshBrowser = function(){
        return browser.driver.navigate().refresh();
    }

};
module.exports = GlobalUtil;