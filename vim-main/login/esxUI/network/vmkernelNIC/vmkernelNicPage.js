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
            return  element(by.css('#contextMenu > li:nth-child(3)'));
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
module.exports = VMkernelNicPage;
