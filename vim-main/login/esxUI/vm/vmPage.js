'use strict';

var VirtualMachinesPage = {

    createRegisterVMButton:{
        self: function () {
            return element(by.id('createVMButton'));
        },

        newVMWizard: {

            // Select a name and guest OS page
            vmNameTextBox: function () {
                return element(by.id('vmName'));
            },

            guestOSFamilyDropDown: {

                self: function () {
                    return element(by.css('[vui-dropdown=OSFamilyOptions] .k-select'));
                },

                option: function (osFamily) {
                    return element(by.cssContainingText('li', osFamily));
                },
                
            },

            guestOSVersionDropDown: {

                self: function () {
                    return element(by.css('[vui-dropdown=OSVersionOptions] .k-select'));
                },

                option: function (osVersionBit) {
                    var osVersion = osVersionBit.split(" ");
                    //console.log(osVersion);
                    return element(by.xpath('//li[contains(text(),"'+osVersion[0]+'") and contains(text(),"'+osVersion[1]+'") and contains(text(),"'+osVersion[2]+'")]'));

                }
            },

            // Select register-vm page
            storageDataTable: function () {
                return element.all(by.css('#vmStorageGrid tbody tr')).get(0);
            },

            // Customize settings page
            
            addOtherDeviceButton: {
                self: function () {
                    return element(by.id('addOtherDeviceButton'));
                },

                device: function (deviceID) {
                    return element(by.id(deviceID));
                },

                scsiController: function () {
                    return element(by.id('AddSCSIControllerItem'));
                },

            },

            addHDButton:{
                self: function () {
                    return element(by.id('addHDButton'));
                },

                device: function (deviceID) {
                    return element(by.id(deviceID));
                },

                // Existingharddisk: function () {
                //     return element(by.id('addExistingHDItem'))
                // },
            },

            addNetworkButton:{
                self: function () {
                    return element(by.id('addNetworkButton'));
                },

                // device: function (deviceID) {
                //     return element(by.id(deviceID));
                // },
            },

            memoryTextbox:function(num){
                return element.all(by.model('memory.RAM')).get(num);
            },

            hardDiskSlideDown:{

                self:function (num) {
                    return element(by.css('#harddrive-'+num+' > div:nth-child(1) > div:nth-child(1)'));
                },

                /**
                 * @param {number} num - The number of Hard drive slidedown.
                 * @param {boolean} expended - If the slidedown is expended. true or false.
                 */
                hardDiskSizeTextbox:function (num, expended) {
                    if (expended){
                        return element(by.css('#harddrive-'+num+' [vui-sb-content-expanded] [ng-model="hd.HD"]'));
                    } else {
                        return element(by.css('#harddrive-'+num+' [vui-sb-content] [ng-model="hd.HD"]'));
                    }
                },

                hardDiskUnitDropDown:{

                    /**
                     * @param {number} num - The number of Hard drive slidedown.
                     * @param {boolean} expended - If the slidedown is expended. true or false.
                     */
                    self:function (num, expended) {
                        if(expended){
                            return element(by.css('#harddrive-'+num+' [vui-sb-content-expanded] [vui-dropdown="hd.HDUnit"] .k-select'));
                        }else{
                            return element(by.css('#harddrive-'+num+' [vui-sb-content] [vui-dropdown="hd.HDUnit"] .k-select'));
                        }
                    },

                    mbOption:function () {
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(0);
                    }

                },

                /**
                 * @param {number} num - The number of Hard drive slidedown.
                 * @param {string} type - The type of provision, thin, lazy or eager
                 */
                hardDiskProvisionType:function (num, type) {

                    return element(by.css('#harddrive-'+num+' input[value="'+type+'"]'));
                },


                virtualDeviceNodeControllerDropDown:{

                    self:function (num){
                        return element(by.css('#harddrive-'+num+' [vui-dropdown="hd.VirtualDeviceNodeController"] .k-select'));
                    },

                    controllerType:function (num) {
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                    }

                },

                virtualDeviceNodeLocationDropDown: {

                    self:function (num) {
                        return element(by.css('#harddrive-'+num+' [vui-dropdown="hd.VirtualDeviceNodeLocation"] .k-select'));
                    },

                    // common element
                    controllerLocation:function (num) {
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                    }

                },

                diskModeDropDown:{

                    self :function (num) {
                        return element(by.css('#harddrive-'+num+' [vui-dropdown="hd.DiskMode"] .k-select'));
                    },

                    // common element
                    diskMode:function (num) {
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                    }

                },

                removeButton: function (num, expended) {
                    if(expended){
                        return element(by.css('#harddrive-' + num + ' [vui-sb-content-expanded] [ng-click="removeHD(_index)"]'));
                    }else {
                        return element(by.css('#harddrive-' + num + ' [vui-sb-content] [ng-click="removeHD(_index)"]'));
                    }
                    
                }
                
                
            },

            scsiControllerSlideDown: {

                self:function (num) {
                    return element(by.css('#scsi-controller-'+num+' > div:nth-child(1) > div:nth-child(1)'));
                },

                scsiControllerDropDown: {

                    self:function (num, expended) {
                        if (expended) {
                            return element(by.css('#scsi-controller-'+num+' [vui-sb-content-expanded] [vui-dropdown="scsi.Type"] .k-select'));
                        } else {
                            return element(by.css('#scsi-controller-'+num+' [vui-sb-content] [vui-dropdown="scsi.Type"] .k-select'));
                        }
                    },
                    // common element
                    scsiControllerType:function (num) {
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                    }

                },

                scsiBusSharingDropDown:{

                    self:function(num){
                        return element(by.css('#scsi-controller-'+num+' [vui-dropdown="scsi.BusSharing"] .k-select'));
                    },

                    // common element
                    scsiBusSharingType:function(num){
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                    },

                }

            },

            networkAdapterSlideDown:{

                self:function (num) {
                    return element(by.css('#network-adapter-'+num+' > div:nth-child(1) > div:nth-child(1)'));
                },

                adapterTypeDropDown: {
                    self: function (num) {
                        return element(by.css('#network-adapter-' + num + ' [vui-dropdown="network.AdapterType"] .k-select'));
                    },

                    // common element
                    adapterType: function (num) {
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                    },

                },

                macAddressTypeDropDown: {
                    self: function (num) {
                        return element(by.css('#network-adapter-' + num + ' [vui-dropdown="network.MACAddressType"] .k-select'));
                    },

                    // common element
                    macAddressType: function (num) {
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                    },

                },

                macAddressTextBox: function () {
                    return element(by.model('network.MACAddress'));
                },



                removeButton: function (num, expended) {
                    if(expended){
                        return element(by.css('#network-adapter-' + num + ' [vui-sb-content-expanded] [ng-click="removeNetwork(_index)"]'));
                    }else {
                        return element(by.css('#network-adapter-' + num + ' [vui-sb-content] [ng-click="removeNetwork(_index)"]'));
                    }

                }


            },

            cdromSlideDown: {
                
                self: function (num) {
                    return element(by.css('#cdrom-'+num+' > div:nth-child(1) > div:nth-child(1)'));
                },
                
                cdromControllerDropDown: {
                    self: function (num) {

                        return element(by.css('#cdrom-'+num+' [vui-dropdown="cdrom.VirtualDeviceNodeController"] .k-select'));
                    },

                    cdromController: function (num) {
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                    },

                },

                cdromLocationDropDown: {
                    self: function (num) {
                        return element(by.css('#cdrom-'+num+' [vui-dropdown="cdrom.VirtualDeviceNodeLocation"] .k-select'));
                    },

                    cdromLocation: function (num) {
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                    },

                },


                removeButton: function (num, expended) {
                    if(expended){
                        return element(by.css('#cdrom-' + num + ' [vui-sb-content-expanded] [ng-click="removeCdromDrive(_index)"]'));
                    }else {
                        return element(by.css('#cdrom-' + num + ' [vui-sb-content] [ng-click="removeCdromDrive(_index)"]'));
                    }

                }

            },
            
            serialPortSlideDown: {

                self: function (num) {
                    return element(by.css('#serial-port-'+num+' > div:nth-child(1) > div:nth-child(1)'));
                },

                serialTypeDropDown: {
                    self :function (num, expended) {
                        if (expended) {
                            return element(by.css('#serial-port-'+num+' [vui-sb-content-expanded] [vui-dropdown="serial.Type"] .k-select'));
                        } else {
                            return element(by.css('#serial-port-'+num+' [vui-sb-content] [vui-dropdown="serial.Type"] .k-select'));
                        }
                    },
                    
                    serialType: function (num) {
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                    },
                    
                },
                
                pipeNameTextbox: function () {
                    return element(by.model('wizardOptions.data.serials[_index].PipeName'));
                },

                portURI: function () {
                    return element(by.model('wizardOptions.data.serials[_index].PortURI'));
                }

            },

            usbControllerSlideDown: {

                self: function (num) {
                    return element(by.css('#usb-controller-'+num+' > div:nth-child(1) > div:nth-child(1)'));
                },

                
                usbSettingsDropDown: {
                    self: function (num) {
                        return element.all(by.css('[vui-dropdown="usb.Settings"]')).get(num);
                    },
                    
                    option: function (num) {
                        return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                    }
                    
                }
            },
            
            vmOptionsTab:{
                self:function () {
                    return element.all(by.css('button[ng-click="clickAction($event,tab)"]')).get(1);
                },
                remoteConsoleSlideDown:{
                    self:function () {
                        return element(by.css('[vui-stack-block="vmOptionsStackView.vmRemoteBlock"] > div:nth-child(1) > div:nth-child(1)'))
                    },

                    guestOSLockCheckBox:function (expended) {
                        if(expended){
                            return element.all(by.model('wizardOptions.data.vm.GuestOSLock')).get(1);
                        } else{
                            return element.all(by.model('wizardOptions.data.vm.GuestOSLock')).get(0);
                        }
                        
                    },

                    maximumNumberSessionsCheckBox:function () {
                        return element(by.model('wizardOptions.data.vm.MaximumNumberSessions'));
                    },

                    maximumNumberSessionsValue:function () {
                        return element(by.model('wizardOptions.data.vm.MaximumNumberSessionsValue'));
                    }
                },


                vmToolsSlideDown:{
                    self:function () {
                        return element(by.css('[vui-stack-block="vmOptionsStackView.vmToolskBlock"] > div:nth-child(1) > div:nth-child(1)'))
                    },

                    powerOperationStopDropDown:{
                        self: function () {
                            return element(by.css('[vui-dropdown="vm.PowerOperationStop"] .k-select'));
                        },

                        // common element
                        powerValue:function (num) {
                            return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                        }
                    },


                    powerOperationPauseDropDown:{
                        self: function () {
                            return element(by.css('[vui-dropdown="vm.PowerOperationPause"] .k-select'));
                        },

                        // common element
                        powerValue:function (num) {
                            return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                        }
                    },

                    powerOperationRestartDropDown:{
                        self: function () {
                            return element(by.css('[vui-dropdown="vm.PowerOperationRestart"] .k-select'));
                        },

                        // common element
                        powerValue:function (num) {
                            return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                        }
                    },

                    runScripts:{
                        afterPoweringOn:function () {
                            return element(by.model('wizardOptions.data.vm.AfterPoweringOn'));
                        },
                        afterResuming:function () {
                            return element(by.model('wizardOptions.data.vm.AfterResuming'));
                        },
                        beforeSuspending:function () {
                            return element(by.model('wizardOptions.data.vm.BeforeSuspending'));
                        },
                        beforeShuttingDown:function () {
                            return element(by.model('wizardOptions.data.vm.BeforeShuttingDown'));
                        }

                    }
                },


                bootOptionSlideDown:{
                    self:function () {
                        return element(by.css('[vui-stack-block="vmOptionsStackView.bootOptionsBlock"] > div:nth-child(1) > div:nth-child(1)'))
                    },

                    firmwareDropDown:{
                        self: function () {
                            return element(by.css('[vui-dropdown="vm.Firmware"] .k-select'));
                        },

                        // common element
                        firmwareValue:function (num) {
                            return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                        }
                    },

                    enableUEFISecureBootCheckbox:function () {
                        return element(by.model('enableUEFISecureBoot.value'));
                    },

                    forceBiosSetupCheckbox:function () {
                        return element(by.model('wizardOptions.data.vm.ForceBiosSetup'));
                    },

                    failedBootRecoveryCheckbox:function () {
                        return element(by.model('wizardOptions.data.vm.FailedBootRecovery'));
                    },

                    failedBootRecoveryValueTextBox:function () {
                        return element(by.model('wizardOptions.data.vm.FailedBootRecoveryValue'));
                    },

                },

                advancedSlideDown:{
                    self:function () {
                        return element(by.css('[vui-stack-block="vmOptionsStackView.advancedBlock"] > div:nth-child(1) > div:nth-child(1)'))
                    },

                    disableAccelerationCheckbox:function () {
                        return element(by.model('wizardOptions.data.vm.DisableAcceleration'));
                    },

                    enableLoggingCheckbox:function () {
                        return element(by.model('wizardOptions.data.vm.EnableLogging'));
                    },

                    swapFileLocationRadioButton:function (num) {
                        return element.all(by.model('wizardOptions.data.vm.SwapFileLocation')).get(num);
                    },

                    latencySensitivityDropDown:{
                        self: function () {
                            return element(by.css('[vui-dropdown="vm.LatencySensitivity"] .k-select'));
                        },

                        // common element
                        latencySensitivityValue:function (num) {
                            return element.all(by.css('div[data-role=popup][style*=block] li')).get(num);
                        }
                    },


                },

            },
            

            // Ready to complete page
            vmNameSummary: function () {
                //return element(by.css('[data=newVMSummary.data]'));
                return element(by.cssContainingText('.stack-view-label', browser.params.vmMsg.vm.wizard.summary.cpu));
            },


            // Wizard footer
            nextButton: function () {
                return element(by.css('button[ng-click="onNextClick()"]'));
            },

            finishButton: function () {
                return element(by.css('button[ng-click="onFinish()"]'));
            },

            cancelButton: function () {
                return element(by.css('button[ng-click="onClose()"]'));
            },

            cancelSettingsButton: function () {
                return element(by.css('button[ng-click="vuiDialog.onCancel()"]'));
            },

            // Error message
            clearValidationBannerButton:function () {
                return element(by.css('.icon-validation.vui-icon18-dialog-close'));
            }
        }

    },

    powerOnButton: function () {
        return element(by.id('powerOnButton'));
    },

    powerOffButton: function () {
        return element(by.id('powerOffButton'));
    },

    refreshButton: function () {
        return element(by.id('refreshButton'));
    },

    actionsButton: {
        self: function () {
            return element(by.id('actionsButton'));
        },

        snapshotsMenu:{
            self: function(){
                return element(by.id('snapshots'));
            },
            takeSnapshotMenu: function () {
                return element(by.id("takeSnapshot"));
            },

            restoreSnapshotMenu: function () {
                return element(by.id("revertSnapshot"));
            },

            manageSnapshotsMenu:{
                self : function () {
                    return element(by.id("manageSnapshots"));
                },

                manageSnapshotsDialog:{

                    getSnapshotByName:function (snapshotName) {
                        return element(by.cssContainingText('.k-in', snapshotName))
                    },

                    restoreSnapshotButton: function () {
                        return element(by.css(".vui-icon-placeholder.esx-icon-snapshot-revert"));
                    },

                },


            }

        },

        editSettingsMenu: function () {
            return element(by.id('editSettings'));
        },

        editNotesMenu: function () {
            return element(by.id('editNotes'));
        },

    },

    takeSnapshotDialog:{
        nameTextBox: function () {
            return element(by.model('snapshot.title'));
        },
    },

    editNotesDialog:{
        notesTextArea:function () {
            return element(by.model('vm.notes'));
        },
    },

    // VM grid
    vmGrid: {

        self: function(){
            return element(by.css('#vmList'));  //modify
        },

        getVMCheckBoxByName: function (vmName) {
            return element(by.xpath('//div[@title="'+vmName+'"]/../preceding-sibling::td'));
        },

        getVMLinkByName: function (vmName) {
            return element(by.cssContainingText('#vmList tbody td:nth-child(2) a',vmName));    //modify
        },


        getAllvmRows: function () {
            // remove tbody in case there is no VM in the table
            return element.all(by.css('#vmList table tr')).count();  //modify
        },


        rightClickContextMenu: {

            powerMenu:{

                self:function () {
                    return element(by.id('power'));
                },

                powerOnMenu: function () {
                    return element(by.id('powerOn'));
                },

                powerOffMenu: function () {
                    return element(by.id('powerOff'));
                },

                suspendMenu: function () {
                    return element(by.id('suspend'));
                },

                resetMenu: function () {
                    return element(by.id('reset'));
                },

            },

            editSettingsMenu: function () {
                return element(by.id('editSettings'));
            },

            unregisterMenu: function(){
                return element(by.id('unregister'));
            },

            delete: function () {
                return element(by.id('deleteVM'));
            },
        },


    },

    popUpDialog:{
        okButton: function (num){
            return element.all(by.css('.vui-dialog .dialog-footer > button:first-child')).get(num);
        },

        cancelButton: function(){
            return element(by.css('.vui-dialog .dialog-footer > button:nth-child(2)'));
        }


    }

};
module.exports = VirtualMachinesPage;
