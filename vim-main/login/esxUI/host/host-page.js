'use strict';

var HostPage = {

  getHostSummaryIcon: function () {
      return element(by.css('.esx-main-content .identifying-graphic > img'));
   },

   getHostName: function () {
      // return element(by.binding('host.hostname'));
      return element(by.css('span.object-title.ng-binding'));
   },

   manufacturerLabel: function () {
       return element(by.css('.col-lg-6:nth-child(1) .stack-view-row:nth-child(1) span[title]'));    //add

   },

    // hardwareLabel: function () {
    //     return element(by.id('Hardware'));
    // },


};
module.exports = HostPage;
