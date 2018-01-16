'use strict';

var HostPage = {

    getHostSummaryIcon: function () {
        return element(by.css('.esx-main-content .identifying-graphic > img'));
    },

    getHostName: function () {
        // return element(by.binding('host.hostname'));
        return element(by.css('span.object-title.ng-binding'));
    },

    hardwareGrid: {
        self: function () {
            return element(by.css('.col-lg-6:nth-child(1) .vui-portlet'));
        },

        manufacturerLabel: function () {
            return element(by.css('.col-lg-6:nth-child(1) .stack-view-row:nth-child(1) span[title]'));    //add
        },

        networking: {
            titleicon: function() {
                return element(by.css("span[class='icon icon-stackview-networking']"));
            },

            hostname: function() {
                return element(by.css(".col-lg-6:nth-child(1) .stack-view-child-i:nth-child(16) .ng-scope"));
            },

            ipv4Address: function() {
                return element(by.css(".col-lg-6:nth-child(1) .stack-view-child-i:nth-child(17) .ng-scope li:nth-child(1)"));
            },

            ipv6Address: function() {
                return element(by.css(".col-lg-6:nth-child(1) .stack-view-child-i:nth-child(17) .ng-scope li:nth-child(2)"));
            },

            ipv6EnabledStatus: function() {
                return element(by.css(".col-lg-6:nth-child(1) .stack-view-child-i:nth-child(20) .ng-scope"));
            }
        }

    }

};
module.exports = HostPage;
