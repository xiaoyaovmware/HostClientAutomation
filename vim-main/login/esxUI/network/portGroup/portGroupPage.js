'use strict';

var PortGroupPage = {

    addPortGroupButton: function() {
        return element(by.id('portgroupAdd'));
    },

    refreshButton: function() {
        return element(by.id('portgroupRefresh'));
    },

    addPortGroupDialog:{
        portGroupNameTextBox: function() {
           return  element(by.model('data.name'));
        },


        vSwitchDropDown: {
            self: function(){
                return element(by.css('.k-select'));
            },

            vSwitchOption: function (vSwitchName) {
              return element(by.cssContainingText('[data-role=popup][style*=block] li', vSwitchName));
            },
        },

    },

    editPortGroupDialog:{
        portGroupNameTextBox: function() {
            return  element(by.model('data.name'));
        },
    },


    portGroupGrid:{
        getPortGroupLinkByName: function(portGroupName) {
            return element(by.cssContainingText('#portgroupGrid tr td:nth-child(1) a',portGroupName));
        },
    },

    rightClickContextMenu:{

        editSettingsMenu: function () {
            return  element(by.css('#contextMenu > li:nth-child(2)'));
        },

        removMenu:function () {
            return  element(by.css('#contextMenu > li:nth-child(3)'));
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
module.exports = PortGroupPage;
