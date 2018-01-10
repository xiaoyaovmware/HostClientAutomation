'use strict';

var VMkernelNicPage = {

    addVMKernelNicButton: function () {
        return element(by.id('vmknicAdd'));
    },

    addVMKernelNicDialog:{
        newPortGroupNameTextBox: function() {
            return element(by.model('data.portgroupName'));
        },


        vSwitchDropDown: {
            self: function(){
                return element(by.css('[vui-dropdown="vswitch"] .k-select'));
            },

            vSwitchOption: function (vSwitchName) {
                return element(by.cssContainingText('[data-role=popup][style*=block] li', vSwitchName));
            }
        },

        ipVersionDropDown: {
            self: function () {
                return element(by.css('[vui-dropdown="ip"] .k-select'));
            },

            ipv4Option: function () {
                return element(by.css('[data-role=dropdownlist] option[value=ipv4]'));
            },

            ipv4AndIPv6Option: function () {
                var optionIPv4AndIPv6 = browser.params.networkMsg.network.vmknic.add.ip.both;
                return element(by.cssContainingText('[data-role=popup][style*=block] li', optionIPv4AndIPv6));
            }
        },

        ipv6SettingsLabel: {
            self: function(){
                return element(by.xpath('//button[@ng-click=\'addStaticIPv6Address()\']/../../../../../../div[1]/div[1]'));
            },

            addAddressButton: function () {
                return element(by.xpath('//button[@ng-click=\'addStaticIPv6Address()\']'));
            },

            addressTextbox: function () {
                return element(by.model('address.address'));
            },

            prefixTextbox: function () {
                return element(by.model('address.prefix'));
            }
        },

        servicesCheckboxes: {
            vMotionCheckbox: function () {
                return element(by.model('data.services.vmotion'));
            },

            provisioningCheckbox: function () {
                return element(by.model('data.services.vSphereProvisioning'));
            },

            faultToleranceCheckbox: function () {
                return element(by.model('data.services.faultToleranceLogging'));
            },

            managementCheckbox: function () {
                return element(by.model('data.services.management'));
            },

            replicationCheckbox: function () {
                return element(by.model('data.services.vSphereReplication'));
            },

            nfcCheckbox: function () {
                return element(by.model('data.services.vSphereReplicationNFC'));
            }
        }

    },

    vmKernelNicGrid:{
        getAllvmKernelNicRows: function () {
            return element.all(by.css('#vmknicGrid tbody tr'));
        },

        getVMKernelNicLinkByName: function(vmKernelNicName) {
            return element(by.cssContainingText('#vmknicGrid tr td:nth-child(1) a' ,vmKernelNicName));
        }
    },

    rightClickContextMenu:{
        removMenu:function () {
            return element(by.css('#contextMenu > li:nth-child(3)'));
        }

    },

    notificationLabel: function () {
            return element(by.css('span[ng-bind-html=\'notification.msg\']'));
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
module.exports = VMkernelNicPage;
