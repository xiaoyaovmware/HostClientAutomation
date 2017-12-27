'use strict';

var PackagePage = {

    packageUpdateButton: function () {
        return element(by.id('packageUpdate'));
    },

    packageGrid: function () {
        return element(by.id('packageGrid'));
    }

};
module.exports = PackagePage;
