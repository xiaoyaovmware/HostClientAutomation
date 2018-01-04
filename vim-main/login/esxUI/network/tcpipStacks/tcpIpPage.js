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

    editTCPIPDialog:{

        useDHCPRadioOption: function () {
           return  element(by.id('optionsRadios1'));
        },

        manuallyConfigureRadioOption: function () {
           return  element(by.id('optionsRadios2'));
        },

        hostNameTextbox: function () {
            return  element(by.model('data.hostName'));
        },

        domainNameTextbox: function () {
            return  element(by.model('data.domainName'));
        },

        primaryDNSServerTextbox: function () {
            return  element(by.model('data.primaryDNS'));
        },

        searchDomainsTextbox: function () {
            return  element(by.model('data.searchDomains'));
        },

        ipv4GatewayTextbox: function () {
            return  element(by.model('data.ipv4Gateway'));
        },

        ipv6GatewayTextbox: function () {
            return  element(by.model('data.ipv6Gateway'));
        },

        getHostName: function () {
            return  element(by.model('data.hostName')).getAttribute('value');
        },

        getDomainName: function () {
            return  element(by.model('data.domainName')).getAttribute('value');
        },

        getPrimaryDNSServer: function () {
            return  element(by.model('data.primaryDNS')).getAttribute('value');
        },

        getSearchDomains: function () {
            return  element(by.model('data.searchDomains')).getAttribute('value');
        },

        getIpv4Gateway: function () {
            return  element(by.model('data.ipv4Gateway')).getAttribute('value');
        },

        getIpv6Gateway: function () {
            return  element(by.model('data.ipv6Gateway')).getAttribute('value');
        },

        getSelectedRadio: function () {
           return  element(by.css('input[type=radio]:checked'));
        },

        invalidMessage: function () {
            return element(by.xpath("//span[@ng-bind-html='msg.text']"));
        }

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
