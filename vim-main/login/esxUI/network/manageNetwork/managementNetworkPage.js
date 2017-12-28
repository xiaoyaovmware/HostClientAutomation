'use strict';

var ManagementNetworkPage = {

    editSettingsButton: function() {
        return element.all(by.css('.vui-action-label')).get(0);
    },


    editPortGroupDialog:{
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

    popUpDialog: {
        okButton: function () {
            return element(by.css('.vui-dialog .dialog-footer > button:first-child'));
        },

        cancelButton: function () {
            return element(by.css('.vui-dialog .dialog-footer > button:nth-child(2)'));
        }
    }

};
module.exports = ManagementNetworkPage;
