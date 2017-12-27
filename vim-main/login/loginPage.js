'use strict';

var LoginPage = {

   usernameLabel: function () {
      return  element(by.id('username-label'));
   },

   passwordLabel: function () {
      return  element(by.id('password-label'));
   },

   usernameTextBox: function () {
      // Non sync, use webdriver find element
      return  browser.driver.findElement(by.id('username'));
   },

   passwordTextBox: function () {
      return  element(by.model('credentials.password'));
   },

   submitButton: function () {
      return  element(by.id('submit'));
   },

   loginStatusLabel: function () {
      return  element(by.css('.loginStatus'));
   }

};
module.exports = LoginPage;
