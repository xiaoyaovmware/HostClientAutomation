var Racetrack = require('./common/racetrack.js'),
    racetrack = new Racetrack(),
    screenshotSavePath = 'TestResults/';

var GlobalUtil = require('./common/globalUtil.js');
var globalUtil = new GlobalUtil();

exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine2',

    specs: [
        // P0 test cases -----------------------------------------------------------

        // 'i18n/testcases/join-in-domain.js',
        // 'i18nvm/testcases/check-host-summary.js',                // need update
        // 'i18n/testcases/P0/replace-host-ssl-certificates.js',    //
        // 'i18n/testcases/P1/create-new-vm-adapter-sr-iov.js',
        // 'i18n/testcases/P0/edit-vm/edit-notes-script.js',

        //
        // 'i18n/testcases/P0/host/load-host-client-fall-back.js',                             //
        //
        'i18n/testcases/P0/create-vm/create-new-vm.js',                             //
        //
        // 'i18n/testcases/P0/snapshot/take-vm-snapshot.js',                           // Visible
        // 'i18n/testcases/P0/snapshot/revert-vm-snapshot.js',                         // Visible
        //
        // 'i18n/testcases/P0/edit-vm/edit-settings-for-vm.js',                        //
        // 'i18n/testcases/P0/edit-vm/edit-notes.js',                                  //
        //
        // 'i18n/testcases/P0/power-ops/power-on-off-vm.js',                             // Visible
        // 'i18n/testcases/P0/power-ops/power-on-off-multiple-vm.js',
        // 'i18n/testcases/P0/power-ops/suspend-resume-vm.js',                           // Visible
        // 'i18n/testcases/P0/power-ops/restart-vm.js',                                  // Visible
        //
        // 'i18n/testcases/P0/vswitch/add-standard-switch.js',                         //
        //
        // 'i18n/testcases/P0/port-group/add-port-group.js',                           //
        // //'i18n/testcases/P0/port-group/rename-port-group.js',                      // update
        //
        // 'i18n/testcases/P0/vmknic/create-vmknic.js',                                //
        //
        // // 'i18n/testcases/P0/netstack/edit-netstack.js',                              //***
        // //
        // 'i18n/testcases/P0/manage/change-advanced-settings.js',                                //
        // 'i18n/testcases/P0/manage/assign-license.js',                               //
        //
        // 'i18n/testcases/P0/search/search-item.js',                                  //
        //
        // 'i18n/testcases/P0/register-vm/unregister-register-vm.js',                  //
        // 'i18n/testcases/P0/register-vm/register-vm-state.js',           //
        //
        // 'i18n/testcases/P0/storage/create-folder-in-vmfs.js',                       //
        // 'i18n/testcases/P0/storage/delete-file-in-vmfs.js',                         //
        // 'i18n/testcases/P0/storage/move-file-in-vmfs.js',                           //
        // // 'i18n/testcases/P0/storage/remove-partition.js',
        // 'i18n/testcases/P0/storage/create-vmfs-custom-partition.js',                //
        // 'i18n/testcases/P0/storage/create-nfs-datastore.js',
        //
        // //P1 test cases -----------------------------------------------------------
        //
        // 'i18n/testcases/P1/refresh_browser.js',
        // // // 'i18n/testcases/P1/change-port-group-vswitch.js',
        // // // 'i18n/testcases/P1/edit-settings-for-vm-cdrom-ide0.js',     // Visible Test case issue
        // // // 'i18n/testcases/P1/edit-settings-for-vm-cdrom-ide1.js',     // Visible Test case issue
        // //
        // 'i18n/testcases/P1/storage/create-vmfs-full-disk.js',
        // // 'i18n/testcases/P1/storage/edit-partitions-reset-state.js',
        // // 'i18n/testcases/P1/storage/clear-partition-table.js',
        // 'i18n/testcases/P1/storage/create-nfs-datastore-negative.js',
        // // //
        // 'i18n/testcases/P1/host/login-invalid-credential.js',
        // 'i18n/testcases/P1/host/logout.js',
        // 'i18n/testcases/P1/host/navigator-shortcuts.js',
        // 'i18n/testcases/P1/host/navigator-context-menu.js',
        // 'i18n/testcases/P1/host/minimize-recent-task.js',
        // 'i18n/testcases/P1/host/performance-view.js',
        //
        // 'i18n/testcases/P1/register-vm/register-existing-vm.js',
        // 'i18n/testcases/P1/register-vm/cancel-register-vm.js',
        //
        // 'i18n/testcases/P1/services/disable-enable-ssh.js',                  // Visible
        // 'i18n/testcases/P1/services/disable-enable-console-shell.js',        // Visible
        // 'i18n/testcases/P1/services/enter-exit-maintenance-mode.js',
        // 'i18n/testcases/P1/services/stop-service.js',
        // 'i18n/testcases/P1/services/start-service.js',
        // 'i18n/testcases/P1/services/restart-service.js',
        //
        // 'i18n/testcases/P1/manage/set-service-policy.js',                  // Visible
        // 'i18n/testcases/P1/manage/remove-license.js',
        // 'i18n/testcases/P1/manage/remember-tab-state.js',
        // 'i18n/testcases/P1/manage/authentication-view.js',
        // 'i18n/testcases/P1/manage/certificate-view.js',
        // //
        // //
        // 'i18n/testcases/P1/snapshot/revert-vm-snapshot-manage.js',          // Visible
        //
        // 'i18n/testcases/P1/vswitch/add-uplink.js',                                  // Visible
        // 'i18n/testcases/P1/vswitch/add-uplink-via-edit-switch.js',                  // Visible
        //
        // 'i18n/testcases/P1/create-vm/create-new-vm-thick-provisioned-disk-eagerly-zeroed.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-thick-provisioned-disk-lazily-zeroed.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-virtual-device-ide0.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-virtual-device-ide0-slave.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-virtual-device-ide1-slave.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-virtual-device-sata.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-virtual-device-sata-08.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-disk-mode-independent-persistent.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-disk-mode-independent-non-persistent.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-scsi-vmware-paravirtual.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-scsi-bus-sharing-virtual.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-scsi-bus-sharing-physical.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-adapter-vmxnet3.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-cdrom-ide0-master.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-cdrom-ide1-master.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-negative.js',
        // 'i18n/testcases/P1/create-vm/create-new-vm-negative-memory.js',
        // //
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-ide0.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-sata.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-ide01.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-ide11.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-sata08.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-disk-mode-independent-persistent.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-disk-mode-independent-non-persistent.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-scsi-lsi-logic-sas.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-scsi-vmware-paravirtual.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-scsi-bus-sharing-physical.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-scsi-bus-sharing-virtual.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-scsi1-sas-bus-sharing-physical.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-adapter-e1000e.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-adapter-vmxnet3.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-harddisk.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-network-adapter.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-cdrom.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-serial-port-physical.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-serial-port-named-pipe.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-serial-port-network.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-usb-controller.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-scsi-logic-parallel.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-scsi-logic-sas.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-scsi-bus-logic-parallel.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-scsi-vmware-paravirtual.js',
        // //
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-sata-hot-add.js',                                       // Visible
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-sata08-hot-add.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-disk-mode-independent-persistent-hot-add.js',           // Visible
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-disk-mode-independent-non-persistent-hot-add.js',       // Visible
        // // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-scsi-logic-sas-hot-add.js',                         // Visible
        // // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-scsi-vmware-paravirtual-hot-add.js',                // Visible
        // // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-scsi-bus-sharing-physical-hot-add.js',                  // Visible
        // // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-scsi-bus-sharing-virtual-hot-add.js',                   // Visible
        // // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-add-scsi-logic-sas-bus-sharing-physical-hot-add.js',    // Visible
        // // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-adapter-e1000e-hot-add.js',                             // Visible
        // // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-adapter-vmxnet3-hot-add.js',                            // Visible
        // //
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-delete-component.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-options-remote-console.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-options-vm-power-management.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-options-boot-options.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-options-advanced.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-delete-harddisks-add-new.js',
        // 'i18n/testcases/P1/edit-vm/edit-settings-for-vm-nagative.js',
        //
        // //
        // 'i18n/testcases/P1/host/reboot-host.js',
        // 'i18n/testcases/P0/host/shutdown-host.js'
    ],
    baseUrl: 'https://172.16.168.97/ui',
    allScriptsTimeout: 60000,
    restartBrowserBetweenTests: true,
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 1200000,          // time out for each spec 10 mins
        isVerbose: true,
        realtimeFailure: true
    },

    onPrepare: function () {
        var specDescription = '';

        // jasmine-reporters for Jasmine 2.0
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath:  screenshotSavePath, //'TestResults/vsphere60u2_123456',
            filePrefix: 'xmloutput_TestEnd'
        }));

        // Take screenshots for failed expect for Jasmine 2.0
        jasmine.getEnv().addReporter(new function() {
            var originalAddExpectationResult = jasmine.Spec.prototype.addExpectationResult;
            jasmine.Spec.prototype.addExpectationResult = function () {
                if (!arguments[0]) {
                    // take screenshot
                    // this.description and arguments[1].message can be useful to constructing the filename.
                    if (this.description != specDescription) {

                        browser.params.raceTrack.testCaseResult = 'FAIL';
                        specDescription = this.description;

                        //console.log('Screeshot name: ' + this.description.split(' ').join('_'))
                        //console.log("arguments[1].message " + arguments[1].message);
                        //console.log("this.description " + this.description);
                        var screenshotName = this.description.split(' ').join('_');
                        globalUtil.takeScreenshot(screenshotSavePath, screenshotName).then(function() {
                            browser.sleep(5000);
                        }).then(function(){
                            racetrack.uploadScreenshot(screenshotSavePath, screenshotName);
                        }).then(function(){
                            browser.sleep(5000);
                        });
                    }
                }
                return originalAddExpectationResult.apply(this, arguments);
            };
        });

        // prepare Racetrack test set
        racetrack.testSetBegin(browser.params.build.number, 'yanyant', 'G11N_ESXUI', 'G11n Automation testing for Host Client.', '', '',
            browser.params.build.branch, browser.params.build.type, 'Regression', 'Korean').then(function() {
            racetrack.testSetData('BU', 'CPBU');
        }).then(function(){
            racetrack.testSetData('Product', 'ESXUI');
        }).then(function(){
            racetrack.testSetData('ReleaseNumber', '66');
        }).then(function(){
            racetrack.testSetData('Locale', 'ko_KR');
        }).then(function(){
            racetrack.testSetData('HostOSPlatform', 'x64');
        }).then(function(){
            racetrack.testSetData('BrowserType', 'Chrome');
        }).then(function(){
            racetrack.testSetData('BrowserVerNo', '50.0.2661.87');
        }).then(function(){
            racetrack.testSetData('Automation', 'true');
        }).then(function(){
            racetrack.testSetData('Validation', 'true');
        }).then(function(){
            var startTime = new Date().toUTCString();
            racetrack.testSetData('StartTime', startTime);
        });
        browser.sleep(5000);
    },

    onComplete: function() {
        var endTime = new Date().toUTCString();
        racetrack.testSetData('EndTime',endTime).then(function() {
            return racetrack.testSetEnd();
        });

    },


    capabilities: {
        browserName: 'chrome',
        //browserName: 'firefox',
        'chromeOptions': {
            //'args': ['lang=zh-cn'],
            //'args': ['lang=fr-fr'],
            //'args': ['lang=ja-jp'],
            //'args': ['lang=de-de'],
            //'args': ['lang=es-es'],
            //'args': ['lang=zh-tw'],
            'args': ['lang=ko-kr'],
        }
    },

    params: {
        dismissCEIPDialog: false,
        build: {
            branch: 'place_holder_branch',
            number: 'place_holder_number',
            type: 'place_holder_type'
        },
        raceTrack: {
            log: false,
            testSetID: '',
            testCaseID: '',
            testCaseResult: 'PASS', // Set default test result to PASS
            screenshotSavePath: 'TestResults/'
        },
        i18n: {
            //lang: 'en-us',
            //string: '啊门氘媵',
            //lang: 'zh-cn',
            //string: '啊门氘媵',
            //lang: 'fr-fr',
            //string: 'àçéêëîÏÔŒÙ',
            //lang: 'ja',
            //string: '愛葦淸あいう',
            //lang: 'de-de',
            //string: 'ÄÖÜäöüß',
            //lang: 'es-es',
            //string: 'áÁéÉíÍóÚñÑ',
            //lang: 'zh-tw',
            //string: '丕再你',
            lang: 'ko-kr',
            string: '안녕하십니까',


        },
        login: {
            //host: '10.117.163.36',
            user: 'root',
            password: 'ca$hc0w'
        },
        domain: {
            domainName: 'test.com',
            user: 'administrator',
            password: 'Vmware1!'
        },
        nfs: {
            server: 'test',
            share: '/store'
        },


        networkMsg: require('./i18n/msg/ko-kr/network.json'),
        vmMsg: require('./i18n/msg/ko-kr/vm.json'),
        hostMsg: require('./i18n/msg/ko-kr/host.json'),
        storageMsg: require('./i18n/msg/ko-kr/storage.json'),
        taskMsg: require('./i18n/msg/ko-kr/task.json'),
        missingMsg: require('./i18n/msg/ko-kr/missingstrings.json')
    }

};