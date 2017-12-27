'use strict';

var StoragePage = {


    datastoresTab: {

        self: function () {
            return element.all(by.css('.vui-tabs-container .vui-primary-tabs .nav-tabs > li')).get(0);
        },

        // Buttons
        newDatastoreButton: {
            self: function () {
                return element(by.id('datastoreCreate'));
            },

            newDatastoreWizard: {

                // Select creation type page
                createNewVMFSdatastore: function () {
                    return element(by.css('[value=vmfs]'));
                },

                // Select device
                datastoreNameTextbox: function () {
                    return element(by.id('datastoreName'));
                },

                getDiskRowByType: function (diskType) {
                    return element(by.xpath('//td[text()="'+diskType+'"]'));
                },
                
                // Select partitioning options
                selectPartitionSchemeDropDown: {
                    self: function () {
                        return element(by.css('[vui-dropdown=partitioningType] .k-select'));
                    },

                    fullDiskMenu: function () {
                        return element.all(by.css('[data-role=popup][style*=block] li')).get(0);
                    },

                    customPartitionMenu: function () {
                        return element.all(by.css('[data-role=popup][style*=block] li')).get(1);
                    },

                },

                // Select partitioning options
                getPartition: function(){
                    return element(by.css('[partition-click="selectPartition(partition)"] div[ng-click="internalPartitionClick($index)"]'));
                },
                
                partitionSizeTextbox: function () {
                    return element(by.model('partitionSize.value'));
                },
                
                customPartitionDraghandle: function () {
                    return element.all(by.css('.k-draghandle')).get(0);
                },

                createNewNfsDatastore: function () {
                    return element(by.css('[value=nfs]'));
                },

                nfsDatastoreName: function () {
                    return element(by.model('wizardOptions.data.name'));
                },

                nfsHost: function () {
                    return element(by.model('wizardOptions.data.nfsHost'));
                },

                nfsShare: function () {
                    return element(by.model('wizardOptions.data.nfsShare'));
                },

                nfsTypeNfs3: function () {
                    return element(by.css('[value="NFS"]'));
                },

                nfsTypeNfs4: function () {
                    return element(by.css('[value="NFS41"]'));
                },


                // dataStoreTypeLable: function () {
                //     return element(by.cssContainingText('.stack-view-label', browser.params.storageMsg.storage.datastore.create.pages.summary.type));
                // },

                NFSversionLable: function () {
                    return element(by.cssContainingText('.stack-view-label', browser.params.storageMsg.storage.datastore.create.nfs.version));
                },

                // Wizard footer
                nextButton: function () {
                    return element(by.css('button[ng-click="onNextClick()"]'));
                },

                finishButton: function () {
                    return element(by.css('button[ng-click="onFinish()"]'));
                }

            }
        },


        registerVMButton: function () {
            return element(by.id('datastoreRegister'));
        },


        datastoreBrowserButton: function () {
            return element(by.id('datastoreFileBrowser'));
        },


        refreshButton: function () {
            return element(by.id('datastoreRefresh'));
        },


        datastoreBrowser: {
            deleteButton: function () {
                return element(by.id('fileDelete'));
            },

            moveButton: function () {
                return element(by.id('fileMove'));
            },
            
            refreshButton: function () {
                return element(by.id('fileRefresh'));
            },

            createDirectoryButton: function () {
                return element(by.id('directoryCreate'));
            },

            datastoreBrowserFolder0: function (num) {
                return element.all(by.id('datastore-browser-folder-0')).get(num);
            },

            datastoreBrowserFolder1: function (num) {
                return element.all(by.id('datastore-browser-folder-1')).get(num);
            },


            getFolderByName: function (folderName) {
                return element(by.cssContainingText('#datastore-browser-folder-0 li', folderName));
            },

            getAllFoldersInFolder0: function () {
                return element.all(by.css('#datastore-browser-folder-0 li'));
            },

            getFileByName: function (fileName, fileExtention) {
                return element(by.cssContainingText('#datastore-browser-folder-1 li', fileName + '.' + fileExtention));
            },

            getAllFoldersInFolder1: function () {
                return element.all(by.css('#datastore-browser-folder-1 li'));
            },

            newDirectoryDialoag: {
                nameTextBox: function () {
                    // button "Create directory"
                    return element(by.id('directoryName'));
                }
            },
            
            fileNameField: function (){
                return element(by.model('$parent.providedFileName'));
            }                
            

        },


        // Datastore grid
        dataStoreGrid: {
            resizableIcon: function () {
              return element(by.css('.ui-resizable-handle'));
            },
            
            getDatastoreByName: function (datastoreName) {
                return element(by.cssContainingText('#datastoreGrid tr td:nth-child(1) a',datastoreName));
            },
            
            getDatastoreByRowNum: function (rowNum) {
                return element.all(by.css('#datastoreGrid tr')).get(rowNum);
            },

            getDatastoreNameByRowNum: function (rowNum) {
                return element.all(by.css('#datastoreGrid td a')).get(rowNum);
            },
            
            getDatastoreNameByDiskType: function () {
                return element(by.xpath('//*[text()="SSD"]/parent::td/preceding-sibling::td'));
            },



            // Right-click context menu
            rightClickContextMenu: {
                deleteMenu: function () {
                    return element(by.css('#datastoreDelete'));
                }
            },

        },

    },

    devicesTab: {
        self: function () {
            return element.all(by.css('.vui-tabs-container .vui-primary-tabs .nav-tabs > li')).get(2);
        },

        actionsButton: {
            self: function () {
                return element(by.css('#deviceAction'));
            },

            editPartitions: {
                self: function () {
                    return element(by.css('#deviceEdit'));
                },

                editPartitionsDialog: {
                    deletePartitionButton: function () {
                        return element(by.id('partitionDelete'));
                    },
                    resetButton: function () {
                        return element(by.id('partitionReset'));
                    },
                    getPartition: function () {
                        //return element.all(by.css('[style*="height: 92"] div')).get(4);
                        return element.all(by.css('[style*="height: 92"] div[style*="right"]')).get(0);

                    },
                    freeSpaceSize: function(){
                        return element.all(by.css('[partition-spec="originalPartitionSpec"] [ng-if="showSize"]')).get(0);
                    },
                    freeSpaceSizeAfter: function(){
                        return element.all(by.css('[partition-spec="partitionSpec"] [ng-if="showSize"]')).get(0);
                    }
                }
            },

            clearPartitionTable: function () {
                return element(by.id('deviceClear'));
            },


        },

        // Device grid
        deviceGrid: {

            getDeviceByRowNum: function (rowNum) {
                return element.all(by.css('#deviceGrid tbody tr')).get(rowNum);
            },
            
        },
    },


    popUpDialog: {

        errorImg: function () {
            return element(by.css('img[src*="error48.png"]'));
        },

        okButton: function (num) {
            return element.all(by.css('.vui-dialog .dialog-footer > button:first-child')).get(num);
        },

        cancelButton: function (num) {
            return element.all(by.css('.vui-dialog .dialog-footer > button:nth-child(2)')).get(num);
        }
    }

};
module.exports = StoragePage;
