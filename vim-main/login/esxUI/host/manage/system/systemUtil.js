// 'use strict';
//
//
// var GlobalUtil = require('../../../../../common/globalUtil.js');
// var globalUtil = new GlobalUtil();
// var Racetrack = require('../../../../../common/racetrack.js');
// var Timeout = require('../../../../../common/timeout.js');
//
// var SystemUtil = function () {
//
//     var racetrack = new Racetrack();
//
//     this.confignegativetime = function (SystemPage) {
//
//         return globalUtil.waitForVisibility(SystemPage.timedateButton.editsettingsButton.self()).then(function () {
//             return racetrack.log("- - Click Edit settings button");
//         }).then(function () {
//             return SystemPage.timedateButton.editsettingsButton.self().click();
//         }).then(function () {
//             return racetrack.log("- - Select 'Manually configure the date and time on this host' ");
//         }).then(function () {
//             return globalUtil.waitForVisibility(SystemPage.timedateButton.editsettingsButton.manuallyRadio());
//         }).then(function () {
//             return SystemPage.timedateButton.editsettingsButton.manuallyRadio().click();
//         }).then(function () {
//             return racetrack.log("- - Config time as empty");
//         }).then(function () {
//             return SystemPage.timedateButton.editsettingsButton.datetimetext().sendKeys('');
//         }).then(function () {
//             return SystemPage.timedateButton.editsettingsButton.datetimetext().clear();
//         }).then(function () {
//             return racetrack.log("- - Click Save Button");
//         }).then(function () {
//             return SystemPage.popUpDialog.okButton().click();
//             // }).then(function(){
//             //     return racetrack.log("Verify that error message pops up");
//             // }).then(function () {
//             //     return expect(SystemPage.timedateButton.editsettingsButton.clearValidationBannerButton().isDisplayed()).toBe(true);
//             // }).then(function () {
//             //     return SystemPage.timedateButton.editsettingsButton.clearValidationBannerButton().click();
//             // }).then(function () {
//             //     return SystemPage.popUpDialog.cancelButton().click();
//         })
//     }
//
//
//
// };
//
//
// module.exports = SystemUtil();
