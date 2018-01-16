'use strict';


var GlobalUtil = require('../../../../../common/globalUtil.js');
var globalUtil = new GlobalUtil();
var Racetrack = require('../../../../../common/racetrack.js');
var Timeout = require('../../../../../common/timeout.js');
var currentYear, currentMonth, currentDate, currentDay, currentDayName, currentMonthName, dateTimeFormat, formatedDate;

var SystemUtil = function () {

    var racetrack = new Racetrack();

    // this.confignegativetime = function (SystemPage) {
    //
    //     return globalUtil.waitForVisibility(SystemPage.timedateButton.editsettingsButton.self()).then(function () {
    //         return racetrack.log("- - Click Edit settings button");
    //     }).then(function () {
    //         return SystemPage.timedateButton.editsettingsButton.self().click();
    //     }).then(function () {
    //         return racetrack.log("- - Select 'Manually configure the date and time on this host' ");
    //     }).then(function () {
    //         return globalUtil.waitForVisibility(SystemPage.timedateButton.editsettingsButton.manuallyRadio());
    //     }).then(function () {
    //         return SystemPage.timedateButton.editsettingsButton.manuallyRadio().click();
    //     }).then(function () {
    //         return racetrack.log("- - Config time as empty");
    //     }).then(function () {
    //         return SystemPage.timedateButton.editsettingsButton.datetimetext().sendKeys('');
    //     }).then(function () {
    //         return SystemPage.timedateButton.editsettingsButton.datetimetext().clear();
    //     }).then(function () {
    //         return racetrack.log("- - Click Save Button");
    //     }).then(function () {
    //         return SystemPage.popUpDialog.okButton().click();
    //         // }).then(function(){
    //         //     return racetrack.log("Verify that error message pops up");
    //         // }).then(function () {
    //         //     return expect(SystemPage.timedateButton.editsettingsButton.clearValidationBannerButton().isDisplayed()).toBe(true);
    //         // }).then(function () {
    //         //     return SystemPage.timedateButton.editsettingsButton.clearValidationBannerButton().click();
    //         // }).then(function () {
    //         //     return SystemPage.popUpDialog.cancelButton().click();
    //     })

    this.verifyCurrentDateTime = function (SystemPage) {
        return globalUtil.waitForVisibility(SystemPage.timedateButton.timeDateGrid.currentDateAndTime()).then(function () {
            return racetrack.log("- - Get current date and format it");
        }).then(function () {
            // Get current UTC time
            var currentFullDate = new Date();
            currentYear = currentFullDate.getUTCFullYear();
            currentMonth = currentFullDate.getUTCMonth();
            currentDate = currentFullDate.getUTCDate();
            currentDay = currentFullDate.getUTCDay();
            // Get localized day name from property file
            if (currentDay === 0) {
                currentDayName = browser.params.messagesMsg.date.day_names[0];
            } else if (currentDay === 1) {
                currentDayName = browser.params.messagesMsg.date.day_names[1];
            } else if (currentDay === 2) {
                currentDayName = browser.params.messagesMsg.date.day_names[2];
            } else if (currentDay === 3) {
                currentDayName = browser.params.messagesMsg.date.day_names[3];
            } else if (currentDay === 4) {
                currentDayName = browser.params.messagesMsg.date.day_names[4];
            } else if (currentDay === 5) {
                currentDayName = browser.params.messagesMsg.date.day_names[5];
            } else if (currentDay === 6) {
                currentDayName = browser.params.messagesMsg.date.day_names[6];
            }
            // Get localized month name from property file
            if (currentMonth === 0) {
                currentMonthName = browser.params.messagesMsg.date.month_names[1];
            } else if (currentDay === 1) {
                currentMonthName = browser.params.messagesMsg.date.month_names[2];
            } else if (currentDay === 2) {
                currentMonthName = browser.params.messagesMsg.date.month_names[3];
            } else if (currentDay === 3) {
                currentMonthName = browser.params.messagesMsg.date.month_names[4];
            } else if (currentDay === 4) {
                currentMonthName = browser.params.messagesMsg.date.month_names[5];
            } else if (currentDay === 5) {
                currentMonthName = browser.params.messagesMsg.date.month_names[6];
            } else if (currentDay === 6) {
                currentMonthName = browser.params.messagesMsg.date.month_names[7];
            } else if (currentDay === 7) {
                currentMonthName = browser.params.messagesMsg.date.month_names[8];
            } else if (currentDay === 9) {
                currentMonthName = browser.params.messagesMsg.date.month_names[10];
            } else if (currentDay === 10) {
                currentMonthName = browser.params.messagesMsg.date.month_names[11];
            } else if (currentDay === 11) {
                currentMonthName = browser.params.messagesMsg.date.month_names[12];
            }
            // Format current UTC date time with localized format in property file
            dateTimeFormat = browser.params.messagesMsg.date.format.utc;
            var index = dateTimeFormat.search(/%H/i);
            var dateFormat = dateTimeFormat.substring(0, index - 1);
            formatedDate = dateFormat.replace(/%Y/i, currentYear);
            formatedDate = formatedDate.replace(/%B/i, currentMonthName);
            formatedDate = formatedDate.replace(/%d/i, currentDate);
            formatedDate = formatedDate.replace(/%A/i, currentDayName);

            return console.log("- - Current UTC date is: " + formatedDate);
        }).then(function () {
            return SystemPage.timedateButton.timeDateGrid.currentDateAndTime().getText();
        }).then(function (date) {
            return expect(date).toContain(formatedDate);
        }).then(function () {
            return console.log("- - Verify current UTC date is consistent with the date part of Current Date And Time in page");
        })
    }

};
module.exports = SystemUtil;
