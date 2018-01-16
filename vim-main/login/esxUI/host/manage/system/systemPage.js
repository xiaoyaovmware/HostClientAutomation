'use strict';

var SystemPage = {

    advancedSettingsTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(0);
    },

    AutostartButton: function () {
        return element.all(by.css('[vui-tabs="hostManageSystemTabs"] .vui-toc-tabs ul li')).get(1);
    },

    swapButton: function () {

    },

    timedateButton: {

        self: function () {
            return element.all(by.css('[vui-tabs="hostManageSystemTabs"] .vui-toc-tabs ul li')).get(3);
        },

        timeDateGrid: {
            currentDateAndTime: function () {
                return element(by.css('.ng-scope.stack-view-row .ng-binding.ng-scope span'));
            },

            ntpClientStatus: function () {
                return element.all(by.css('.ng-scope.stack-view-row .ng-binding.ng-scope')).get(1);
            },

            ntpServicesStatus: function () {
                return element.all(by.css('.ng-scope.stack-view-row .ng-binding.ng-scope')).get(2);
            },

            ntpServers: function () {
                return element.all(by.css('.ng-scope.stack-view-row .ng-binding.ng-scope')).get(3);
            }
        },

        editsettingsButton: {
            self: function () {
               return element(by.id('timeEdit'));
            },

            manuallyRadio: function () {
                return element(by.id('optionsRadios1'));
            },

            networkRadio: function () {
                return element(by.id('optionsRadios2'));
            },

            datetimetext: function () {
                // return element(by.id('ntpManualDateTime'));
                return element(by.css('div.col-sm-4 div.input-group.date > input.form-control'));
            },

            // Error message
            validationmessagetext: function () {
                return element(by.css('.validation-message-text'));
            },

            clearValidationBannerButton:function () {
                return element(by.css('.icon-validation.vui-icon18-dialog-close'));
            }
        }
    },


    popUpDialog: {
        okButton: function () {
            return element(by.css('.vui-dialog .dialog-footer > button:first-child'));
        },

        cancelButton: function () {
            return element(by.css('.vui-dialog .dialog-footer > button:nth-child(2)'));
        }
    }




};
module.exports = SystemPage;
