'use strict';


var AdvancedSettingsPage = {

   editOptionButton: function () {
      return element(by.id('advancedSettingsEdit'));
   },

   actionsButton:{
      self: function () {
         return element(by.id('advancedSettingsAction'));
      },

      resetToDefault: function () {
         return element(by.css('.primary-nav .esx-icon-host-reset-advanced-setting'));
      },
   },

   attributeGrid:{
      getConfigAttribute: function (attributeName) {
         return element.all(by.cssContainingText('#settingsGrid tr td:nth-child(1)', attributeName)).get(0);
      },
   },

   editOptionDialog:{
      inputTextBox: function() {
         return element(by.model('data.newValue'));
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
module.exports = AdvancedSettingsPage;
