'use strict';

var MonitorPage = {

    performanceTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(0);
    },

    performanceChart:function () {
        return element(by.id('perfChart'));
    },

    hardwareTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(1);
    },

    eventsTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(2);
    },

    tasksTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(3);
    },

    logsTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(4);
    },

    notificationssTab: function () {
        return element.all(by.css('.nav.nav-tabs>li>a')).get(5);
    },

};
module.exports = MonitorPage;
