'use strict';

var VSwitchPage = {
   //var self = this;


    addvSwitchButton: function () {
        return element(by.id('vSwitchAdd'));
    },

    refreshButton: function () {
        return element(by.id('vSwitchRefresh'));
    },


    vSwitchGrid:{

        self: function(){
            return element(by.css('#vswitchGrid'));
        },

        getAllvSwitchRows: function () {
            return element.all(by.css('#vswitchGrid table tbody tr')).count();
        },

        getVSwitchLinkByName:function (vswitchName) {
            return element(by.cssContainingText('#vswitchGrid tr td:nth-child(1) a',vswitchName));
        },
    },

    addvSwitchDialog:{
        vSwitchNameTextBox: function () {
           return element(by.model('data.name'));
        },
    },

    rightClickContextMenu:{

        addUplink:{
            self: function () {
                return element(by.css('#contextMenu > li:nth-child(2)'));
            },
        },

        editSettings:{
            self: function () {
                return element(by.css('#contextMenu > li:nth-child(4)'));
            },

            editSwitchDialog:{

                addUplinkButton:function () {
                    return element(by.id('1'));
                },

                removeUplinkButton:function (uplinkNum) {
                    return element.all(by.css('.esx-icon-close')).get(uplinkNum);
                }
            }
        },

        removMenu:function () {
            return  element(by.css('#contextMenu > li:nth-child(5)'));
        },
    },


    popUpDialog: {
        okButton: function (num) {
            return element.all(by.css('.vui-dialog .dialog-footer > button:first-child')).get(num);
        },

        cancelButton: function () {
            return element(by.css('.vui-dialog .dialog-footer > button:nth-child(2)'));
        },

        errorMsg: function (errMsg) {
            return element(by.cssContainingText(".panel-content>div>div>p", errMsg));
        }
    }
   
};
module.exports = VSwitchPage;
