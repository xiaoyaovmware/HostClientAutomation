'use strict';

var ManagePage = {

    advancedSettingsTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(0);
    },

    licensingTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(2);
    },

    packagesTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(3);
    },

    servicesTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(4);
    },

    securityAndUsersTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(5);
    },

};
module.exports = ManagePage;
