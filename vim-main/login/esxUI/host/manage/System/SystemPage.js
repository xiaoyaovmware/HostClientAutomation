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

    TimeanddateButton: function () {
        return element.all(by.css('[vui-tabs="hostManageSystemTabs"] .vui-toc-tabs ul li')).get(3);
    },




};
module.exports = SystemPage;
