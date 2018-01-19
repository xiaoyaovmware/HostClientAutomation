'use strict';

var securityAndUsersPage = {

    certificatesButton: function () {
        return element.all(by.css('[vui-tabs="hostManageSecurityTabs"] .vui-toc-tabs ul li')).get(2);
    },

    importNewCertificateButton: function () {
        return element(by.id('certInstall'));
    },

    importCertificateDialog: {
        generateFQDNSigningRequestButton: function () {
            return element(by.id('generateFQDNCSR'));
        },

        getCSRTextArea: function () {
            return element(by.model('data.certText'));
        },

        certificateSigningDialog: {
            certificateSigningRequestResultTitle: function () {
            // Certificate signing request result
                return element(by.css('span[title="' + browser.params.hostMsg.host.manage.system.security.certificates.actions.genCSR.title + '"]'));
            },

            copyToClipBoardButton: function () {
                return element(by.buttonText(browser.params.hostMsg.host.manage.system.security.certificates.actions.genCSR.copyToClipboard));
            },

            closeButton: function () {
                return element(by.buttonText(browser.params.hostMsg.host.manage.system.security.certificates.actions.genCSR.close));
            }
        }
    },

    authenticationButton: {
        self: function () {
            return element.all(by.css('[vui-tabs="hostManageSecurityTabs"] .vui-toc-tabs ul li')).get(1);
        },

        authJoinDomainButton: function () {
            return element(by.id('authJoinDomain'));
        },

        joinDomainDialog: {
            self: function () {
                return element(by.css("div[style='width: 590px; height: 240px;']"));
            },

            domainNameTextbox: function () {
                return element(by.model('data.domain'));
            },

            userNameTextbox: function () {
                return element(by.model('data.username'));
            },

            passwordTextbox: function () {
                return element(by.model('data.password'));
            },

            userAuthenticationProxyCheckbox: function () {
                return element(by.model('data.useAuthProxy'));
            },

            authenticationProxyCheckbox: function () {
                return element(by.model('data.authProxy'));
            }
        },

        authLeaveDomainButton: function () {
            return element(by.id('authLeaveDomain'));
        }
    },

    usersButton: function () {
        return element.all(by.css('[vui-tabs="hostManageSecurityTabs"] .vui-toc-tabs ul li')).get(3);
    },

    adduserButton: {
        self: function () {
            return element(by.id('addUser'));
        },

        adduserwizard: {
            usernameTextBox: function () {
                return element(by.model('data.user.id'));
            },

            descriptionTextBox: function () {
            return element(by.model('data.user.description'));
            },

            passwordTextBox: function () {
                return element(by.model('data.user.password'));
            },

            confirmpasswordTextBox: function () {
                return element(by.model('data.user.confirmPassword'));
            }
        }
    },

    userGrid: {
        self : function () {
            return element(by.css('#userGrid'));
        },

        getuserLinkByName: function (username) {
            return element(by.xpath('//td[contains(text(), "' + username + '")]'));
        },

        removeuserButton: function() {
            return element(by.id('removeUser'));
        }
    },

    refreshButton: function () {
        return element(by.id('refreshUsers'));
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
module.exports = securityAndUsersPage;
