'use strict';

var LoginPage = require('../../../common/login.js');
var Timeout = require('../../../common/timeout.js');
var Util = require('../../../common/globalUtil.js');
var HostPage = require('../.././securityAndUsersPage.js');
var ClientPage = require('../../../common/client-page.js');
var HostUtil = require('../.././host-util.js');

describe('Host E2E', function () {
   var login = new LoginPage(),
      util = new Util(),
      clientPage = new ClientPage(),
      hostPage=new HostPage(),
      hostUtil=new HostUtil();
   beforeEach(function () {
      login.init();
   });

   describe('P1 Tests', function () {
      beforeEach(function () {
         login.login();
         globalUtil.dismissCEIPDialog();

         //Click on Host left menu
         clientPage.getHostMenu().click();
      });

      afterEach(function () {
         //browser.executeScript('window.sessionStorage.clear();');
         //browser.executeScript('window.localStorage.clear();');
         clientPage.logOut();
      });

      it('Change manage long int value and reset to default', function () {
         hostPage.getManageObjectNavigator().click();
         expect(hostPage.getSecurityAndUsersTab().isDisplayed()).toBe(true);
         hostPage.getSecurityAndUsersTab().click();
         expect(hostPage.getAuthenticationButton().isDisplayed()).toBe(true);

         var domainName = browser.params.domain.domainName;
         var domainUserName = browser.params.domain.user;
         var domainPassword = browser.params.domain.password;

         hostUtil.joinInDomain(hostPage,domainName,domainUserName, domainPassword);

         browser.driver.sleep(5000);
         // Check for recent task
         hostUtil.checkFirstTask('Join Domain', globalUtil.getHostName());
        

      }, Timeout.APPLICATION_TIMEOUT);

    



   
   });
});
