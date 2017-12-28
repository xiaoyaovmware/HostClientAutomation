'use strict';

var ServicesPage = {


    startButton: function () {
        return element(by.css('#servicesGrid #serviceStart'));
    },

    stopButton: function () {
        return element(by.css('#servicesGrid #serviceStop'));
    },

    restartButton: function () {
        return element(by.css('#servicesGrid #serviceRestart'));
    },

    actionButton: {
        self: function () {
            return element(by.id('serviceAction'));
        },
        startMenu: function () {
            return element(by.css('#contextMenu #serviceStart'));
        },

        policyMenu: {
            self: function () {
                return element(by.css('#contextMenu #servicePolicy'));
            },
            policyName: function (num) {
                return element.all(by.css('#contextMenu #servicePolicy li')).get(num);
            },

        },

    },


    // VM grid
    vmGrid: {

        self: function () {
            return element(by.id('servicesGrid'));
        },

        getServicesByName: function (serviceName) {
            return element(by.cssContainingText('#servicesGrid tr td:nth-child(1) div', serviceName));
        },

        rightClickContextMenu: {
            restartMenu: function () {
                //return element(by.css('#contextMenu #serviceStart a'));
                return element.all(by.repeater('d in contextMenu.structure')).get(0);
            },
        },


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
module.exports = ServicesPage;
