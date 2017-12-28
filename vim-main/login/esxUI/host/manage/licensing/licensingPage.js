'use strict';

var LicensingsPage = {


   assignLicenseButton: {
      self: function () {
         return element(by.id('assignLicenseButton'));
      },

      assignLicenseDialog:{
         licenseTextBox: function () {
            return element(by.model('data.key'));
         },
      },
   },

   removeLicenseButton: function() {
      return element(by.id('removeLicenseButton'));
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
module.exports = LicensingsPage;
