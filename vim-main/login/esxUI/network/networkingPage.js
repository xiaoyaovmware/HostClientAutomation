'use strict';

var NetworkingPage = {
    portGroupsTab: function(){
        return element.all(by.css('.nav.nav-tabs>li>a')).get(0);
    },
    vSwitchTab: function(){
        return element.all(by.css('.nav.nav-tabs>li>a')).get(1);
    },

    vmKernelNicTab: function(){
        return element.all(by.css('.nav.nav-tabs>li>a')).get(3);
    },

    tcpIpStackTab: function(){
        return element.all(by.css('.nav.nav-tabs>li>a')).get(4);
    }

};
module.exports = NetworkingPage;