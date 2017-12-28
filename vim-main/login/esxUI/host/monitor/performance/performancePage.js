'use strict';


var PerformancePage = {

   chartDropdown: {

      self: function () {
         return element(by.css('[vui-dropdown=chartDropdown] .k-select'));
      },

       chartOption:function (num) {
           return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
       }
   },

    axisLabel:function (label) {
        return element(by.cssContainingText('.nv-y .nv-axislabel', label))
    },

    axisLabelDisk:function (label) {
        return element(by.cssContainingText('.nv-y1 .nv-axislabel', label))
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
module.exports = PerformancePage;
