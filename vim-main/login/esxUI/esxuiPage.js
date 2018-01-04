'use strict';

var EsxuiPage = {

    dismissNotificationButton: function () {
        return element(by.css('a.alert-dismiss-link'));
    },
    
    // Navigator
    navigator: {
        hostMenu: {
            self: function(){
                return element.all(by.css('.object-navigator-label.short-label.bold')).get(0);
            },

            manageMenu: function(){
                return element.all(by.css('.object-navigator-label.menu-children1.short-label')).get(0);
            },

            monitorMenu: function(){
                return element.all(by.css('.object-navigator-label.menu-children1.short-label')).get(1);
            },

            contextMenu:{
                shutDownMenu: function(){
                    return element.all(by.css('#contextMenu > li > a')).get(1);
                },

                rebootMenu: function(){
                    return element.all(by.css('#contextMenu > li > a')).get(2);
                },
            }
        },

        vmMenu: {
            self: function () {
                return element(by.css('a[ui-sref="host.vms"]'));
            },

            getVMByName:function (vmName) {
                return element(by.cssContainingText('.object-navigator-label.short-label.bold', vmName));
            },

            contextMenu:{
                createVMMenu: function(){
                    return element(by.id('createNewVM'));
                },
            }
        },

        storageMenu: function () {
            return element(by.css('a[ui-sref="host.storage"]'));
        },

        networkMenu: function () {
            return element.all(by.css('a[ui-sref="host.networking"]')).get(0);
        },

        minimizeButton: function () {
            return element(by.css('.icon-minimize-left'));
        },

        minimizedNaviagtorButton: function () {
            return element(by.css('[ng-if="navigatorHidden"] .esx-icon-navigator'));
        },


        hostButton: function () {
            return element(by.css('.vui-panel.navigator-button.collapsed .esx-icon-host'));
        },

        hostAdvSettingButton: function () {
            return element(by.css('.vui-panel.navigator-button.collapsed .esx-icon-host-advanced-settings'));
        },

        hostMonitorButton: function () {
            return element(by.css('.vui-panel.navigator-button.collapsed .esx-icon-host-monitor'));
        },

        vmButton: function () {
            return element(by.css('.vui-panel.navigator-button.collapsed .esx-icon-vm'));
        },

        networkButton: function () {
            return element(by.css('.vui-panel.navigator-button.collapsed .esx-icon-networking'));
        },

        datastoreButton: function () {
            return element(by.css('.vui-panel.navigator-button.collapsed .esx-icon-datastore'));
        },

    },

    hostName: function () {
        return browser.driver.findElement(by.css('[ng-bind="host.hostname"]'));
    },

    recentTaskIcon: function () {
        return browser.driver.findElement(by.css('#bottomBar .esx-icon-task'));
    },

    minimizeRecentTaskButton: function () {
        return element(by.css('.icon-minimize'));
    },

    minimizedRecentTaskButton:function () {
        return element(by.css('.vui-panel.collapsed'));
    },

    recentTaskGrid:function () {
        return element(by.id('recentTasks'));
    },

    rebootHostButton: function () {
        return element(by.id('rebootHostButton'));
    },

    refreshButton: function () {
        return element(by.id('refreshButton'));
        return element(by.id('refreshButton'));
    },

    actionsButton: {
        self: function () {
            return element(by.id('actionsButton'));
        },

        servicesMenu:{
            self: function(){
                return element(by.id('hostServices'));
            },
            disableEnableSSH: function () {
                return element(by.id('hostServicesSSH'));
            },

            disableEnableConsoleShell: function () {
                return element(by.id('hostServicesShell'));
            },

        },

        enterMaintenanceModeMenu: function () {
            return element(by.id('hostMaintenanceMode'));
        },

        exitMaintenanceModeMenu: function () {
            return element(by.id('hostMaintenanceMode'));
        },

        editNotesMenu: function () {
            return element(by.id('editNotes'));
        },

    },

    searchTextbox:{
        self: function () {
            return element(by.id('search-field'));
        },

        getAllSearchResults: function(){
            return element.all(by.css('.dropdown-menu li'));
        }
    },

    userDropDown:{
        self: function () {
            return element(by.css('.dropdown-toggle'));
        },

        changepasswordMenu: function () {
            return element(by.id('userChangePassword'));
        },

        logoutMenu: function () {
            return element.all(by.css('#contextMenu>li>a')).get(3);
        },

    },

    changepasswordDialog: {
        // self: function () {
        //
        // },

        newpasswordTextBox: function () {
            return element(by.id('password'));
        },

        newpasswordagainTextBox: function () {
            return element(by.id('passwordAgain'));
        },

    },

    helpDropDown:{
        self: function () {
            return element(by.css('.primary-nav li:nth-child(3) > .ng-binding'));
            // return element(by.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/header[1]/ul[1]/li[3]/a[1]'));
        },

        feedbackMenu: function () {
            return element(by.xpath('id("contextMenu")/li[4]/a[1]/span[2]'));
        },

        feedbackDialog:{
            title: function () {
                return element(by.xpath('/html[1]/body[1]/div[2]/div[1]/div[1]/div[1]/span[2]'));
            },

            dialogButtonTakeScreenshot: function () {
                return element(by.css('.floatDiv:nth-child(1) .ng-binding.btn.btn-default'));
            },
        },

    },

    popUpDialog: {
        okButton: function (num) {
            return element.all(by.css('.vui-dialog .dialog-footer > button:first-child')).get(num);
        },

        cancelButton: function () {
            return element(by.css('.vui-dialog .dialog-footer > button:nth-child(2)'));
        }
    }
};
module.exports = EsxuiPage;
