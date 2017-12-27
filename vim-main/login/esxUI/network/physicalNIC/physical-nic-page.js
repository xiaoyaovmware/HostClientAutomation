'use strict';

var PhysicalNicPage = function () {

   this.getVMNicLink = function () {
      return  element(by.css('a[href="#/host/networking/adapters/vmnic0"]'));
   };

   this.getCollapsedPortlet = function (count) {
      return  element(by.css('div[class="vui-portlet no-margin collapsed"]'));
   };

   this.getPortletTitlebar = function (count) {
      return  element(by.css('span[title="Adapter details"]'));
   };

   this.getAdapterDetailsPortletLabels = function (count) {
      return  element(by.css('div[class="vui-portlet no-margin"]')).all(by.css('span[class="stack-view-label ng-binding"]')).get(count);
   };

   this.getPhysicalNicActionBar = function () {
      return  element(by.css('div[class="vui-action-bar ng-scope ng-isolate-scope"]'));
   };

};
module.exports = PhysicalNicPage;
