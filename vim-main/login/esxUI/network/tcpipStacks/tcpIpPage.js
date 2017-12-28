'use strict';

var TcpIpPage = {

   editSettingsButton: function () {
      return  element.all(by.repeater('action in options.actions track by $index')).get(0);
   },

   tcpIpGrid:{
      getDefaultTCPIPLink: function () {
         return  element(by.css('a[href="#/host/networking/netstacks/defaultTcpipStack"]'));
      },

      getRowDefaultTCPIP: function () {
         return  element.all(by.css('#netstackGrid table tr')).get(1);
      },


   },

    editTCOIPDialog:{

        useDHCPRadioOption: function () {
           return  element(by.id('optionsRadios1'));
        },

        manuallyConfigureRadioOption:function () {
           return  element(by.id('optionsRadios2'));
        },

        searchDomainsTextbox:function () {
            return  element(by.id('searchDomains'));
        },


        getSelectedRadio: function () {
           return  element(by.css('input[type=radio]:checked'));
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
module.exports = TcpIpPage;
