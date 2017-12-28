'use strict';

var GlobalUtil = require('../../common/globalUtil.js');
var Racetrack = require('../../common/racetrack.js');
var Timeout = require('../../common/timeout.js');
var Q = require('q');

var EsxuiUtil = function () {

    var self = this,
        racetrack = new Racetrack(),
        globalUtil = new GlobalUtil();

    this.dismissCEIPDialog = function (EsxuiPage) {
        if (browser.params.dismissCEIPDialog){
            var elementToBeClicked = browser.driver.findElement(by.css('body > div.modal-backdrop > div .dialog-footer > button'));
            browser.params.dismissCEIPDialog = false;
            return elementToBeClicked.click();
        }else{
            return self.dismissAlert(EsxuiPage);
        }
    };

    this.dismissAlert = function(EsxuiPage){
        return  EsxuiPage.dismissNotificationButton().isPresent().then(function (present) {
            if(present){
                return EsxuiPage.dismissNotificationButton().click().then(function () {
                    return console.log("Alert present");
                },function (err) {
                    console.log("dismissAlertClick: " + err);
                });
            }else{
                console.log("Alert doesn't appear");
                return browser.sleep(15000);
            }
        }, function (err) {
            console.log("dismissAlert: " + err);
        });
    };

    this.getHostName = function () {

        var title = element(by.css('.object-title'));
        globalUtil.waitForVisibility(title);
        var hostName = '';
        return title.getText().then(function (titleText) {
            return titleText;
        }, function (error) {
            console.log(error);
            return "errorGetHostname";
        });

    };

    this.shutDownHost = function (EsxuiPage) {
        var hostMenu = EsxuiPage.navigator.hostMenu,
            shutDownButton;

        return globalUtil.waitForVisibility(hostMenu.self()).then(function () {
            return racetrack.log("Right click the host.");
        }).then(function () {
            return browser.actions().mouseMove(hostMenu.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return racetrack.log("Click Shutdown menu to shutdown the host");
        }).then(function () {
            return browser.actions().mouseMove(hostMenu.contextMenu.shutDownMenu()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return hostMenu.contextMenu.shutDownMenu().click();
        }).then(function () {
            shutDownButton = EsxuiPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(shutDownButton);
        }).then(function () {
            return shutDownButton.click();
        }).then(function () {
            return browser.driver.sleep(2000);
        })
    };

    this.rebootHost = function (EsxuiPage) {
        var hostMenu = EsxuiPage.navigator.hostMenu,
            rebootButton;

        return globalUtil.waitForVisibility(hostMenu.self()).then(function () {
            return racetrack.log("- - Right click the host.");
        }).then(function () {
            return browser.actions().mouseMove(hostMenu.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().click(protractor.Button.RIGHT).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return racetrack.log("- - Click Reboot menu to reboot the host");
        }).then(function () {
            return hostMenu.contextMenu.rebootMenu().click();
        }).then(function () {
            rebootButton = EsxuiPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(rebootButton);
        }).then(function () {
            return rebootButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_REBOOT);
        })
    };

    this.disableEnableConsoleShell = function (EsxuiPage) {
        var serviceMenu = EsxuiPage.actionsButton.servicesMenu;

        return globalUtil.waitForVisibility(EsxuiPage.actionsButton.self()).then(function () {
            return racetrack.log("- - Click the Actions button");
        }).then(function () {
            return EsxuiPage.actionsButton.self().click();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return racetrack.log("- - Select services > Disable/Enable console shell");
        }).then(function () {
            return globalUtil.waitForVisibility(serviceMenu.self());
        }).then(function () {
            return browser.actions().mouseMove(serviceMenu.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return browser.actions().mouseMove(serviceMenu.disableEnableSSH())
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return serviceMenu.disableEnableConsoleShell().click()
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })

    };

    this.disableEnableSSH = function (EsxuiPage) {
        var serviceMenu = EsxuiPage.actionsButton.servicesMenu;

        return globalUtil.waitForVisibility(EsxuiPage.actionsButton.self()).then(function () {
            return racetrack.log("- - Click the Actions button");
        }).then(function () {
            return EsxuiPage.actionsButton.self().click();
        }).then(function () {
            return racetrack.log("- - Select services > Disable/Enable Secure Shell (SSH)");
        }).then(function () {
            return globalUtil.waitForVisibility(serviceMenu.self());
        }).then(function () {
            return browser.actions().mouseMove(serviceMenu.self()).perform();
        }).then(function () {
            return browser.sleep(1000);
        }).then(function () {
            return serviceMenu.disableEnableSSH().click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })

    };

    this.enterMaintenanceMode = function (EsxuiPage) {
        var yesButton;

        return globalUtil.waitForVisibility(EsxuiPage.actionsButton.self()).then(function () {
            return racetrack.log("- - Click the Actions button");
        }).then(function () {
            return EsxuiPage.actionsButton.self().click();
        }).then(function () {
            return racetrack.log("- - Click Enter maintenance mode");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.actionsButton.enterMaintenanceModeMenu());
        }).then(function () {
            return EsxuiPage.actionsButton.enterMaintenanceModeMenu().click();
        }).then(function () {
            yesButton = EsxuiPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(yesButton);
        }).then(function () {
            return yesButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })

    };

    this.enterMaintenanceModedelayed = function (EsxuiPage) {
        var yesButton;
        var okButton;

        return globalUtil.waitForVisibility(EsxuiPage.actionsButton.self()).then(function () {
            return racetrack.log("- - Click the Actions button");
        }).then(function () {
            return EsxuiPage.actionsButton.self().click();
        }).then(function () {
            return racetrack.log("- - Click Enter maintenance mode");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.actionsButton.enterMaintenanceModeMenu());
        }).then(function () {
            return EsxuiPage.actionsButton.enterMaintenanceModeMenu().click();
        }).then(function () {
            yesButton = EsxuiPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(yesButton);
        }).then(function () {
            return yesButton.click();
        }).then(function () {
            okButton = EsxuiPage.popUpDialog.okButton(0);
            return globalUtil.waitForVisibility(okButton);
        }).then(function () {
            return okButton.click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })
    };

    this.exitMaintenanceMode = function (EsxuiPage) {

        return globalUtil.waitForVisibility(EsxuiPage.actionsButton.self()).then(function () {
            return racetrack.log("- - Click the Actions button");
        }).then(function () {
            return EsxuiPage.actionsButton.self().click();
        }).then(function () {
            return racetrack.log("- - Click Exit maintenance mode");
        }).then(function () {
            return globalUtil.waitForVisibility(EsxuiPage.actionsButton.exitMaintenanceModeMenu());
        }).then(function () {
            return EsxuiPage.actionsButton.exitMaintenanceModeMenu().click();
        }).then(function () {
            return browser.sleep(Timeout.WAIT_FOR_HOST_TASK);
        })

    };

    this.getTaskColumnByRow = function (column, row) {
        try {
            //var table = element.all(by.css('div[vui-datagrid=taskGrid] tbody tr')).get(row);
            //var target = table.all(by.tagName('td')).get(column);
            var target = element(by.css('[vui-datagrid="taskGrid"] tbody tr:nth-child(' + row + ') td:nth-child(' + column + ')'));
            return target;
        } catch (err) {
            console.log('Error inside getRecentTarget=' + err);
            throw err;
        }
    };

    this.getRecentTarget = function (row) {
        return self.getTaskColumnByRow(2, row)
    };

    this.getRecentTask = function (row) {
        return self.getTaskColumnByRow(1, row)
    };

    this.getRecentTaskStatus = function (row) {
        return self.getTaskColumnByRow(6, row)
    };

    this.getRecentTaskCompleteDate = function (row) {
        return self.getTaskColumnByRow(7, row)
    };

    this.retry = function(maxTry){
        console.log("maxTry: "+ maxTry);
        if (maxTry <= 0){
            return "error";
        } else {
            return self.getRowNumOfLatestCompletedTask().then(function(result) {
                if (result == false) {
                    return browser.sleep(30000).then(function() {
                        return self.retry(maxTry - 1);
                    });
                }else{
                    return result;
                }
            })
        }
    };

    this.checkForRecentTask = function (taskName, target, status, maxTry) {
        var foundTask = false,
            latestThreeTaskRows;
        //console.log("Found task? " + foundTask);

        //console.log("maxTry " + maxTry);

        var deferred = Q.defer();


        self.retry(5).then(function(result){
            if (result !== "error"){


                    latestThreeTaskRows = result;


                    //console.log("Found task? " + foundTask);

                    var taskNeedToCheckPromise = [];

                    console.log("Start checking recent tasks. Rows need to check: " + latestThreeTaskRows);
                    console.log("latestThreeTaskRows.length " + latestThreeTaskRows.length);
                    for (var i = 0; i < latestThreeTaskRows.length; i++) {
                        taskNeedToCheckPromise.push(self.getRecentTask(latestThreeTaskRows[i]).getText(),
                            self.getRecentTarget(latestThreeTaskRows[i]).getText(),
                            self.getRecentTaskStatus(latestThreeTaskRows[i]).getText());
                    }

                    Q.all(taskNeedToCheckPromise).done(function (result) {
                        console.log('All promises executed.');
                        for (var i = 0; i < result.length; i += 3) {
                            console.log('result[' + i + '] ' + result[i]);
                            console.log('result[' + (i + 1) + '] ' + result[i + 1]);
                            console.log('result[' + (i + 2) + '] ' + result[i + 2]);
                            //result[i] = new Date(result[i]).getTime();
                            //console.log('result[' + i + '] time ' + result[i]);
                            if (result[i] === taskName &&
                                result[i + 1] === target
                                && result[i + 2] === status) {
                                foundTask = true;
                                console.log("Found task? " + foundTask);
                                break;
                            }
                        }

                        expect(foundTask).toBe(true);
                        deferred.resolve(true);

                    }, function (error) {
                        console.log('Error on checkForRecentTask: ' + error);
                        deferred.resolve(false);
                    });

                //console.log("Found task? " + foundTask);
        } else {
            expect("Failed to check recent task in checkForRecentTask").toBe("Successfully check recent tasks.");
            deferred.resolve(false);
        }

        });


        //browser.sleep(Timeout.WAIT_FOR_TASK_CHECKING);

        return deferred.promise;

    };

    this.getRowNumOfLatestCompletedTask = function () {

        var deferred = Q.defer(),
            taskTable = element.all(by.css('div[vui-datagrid=taskGrid] tbody tr')),
            taskCompletedTimePromise = [],
            hasError = false,
            rows = [];

        taskTable.count().then(function (count) {
            console.log("Task table row count: " + count);

            for (var i = 1; i < count + 1; i++) {
                console.log("Push row: " + i);
                taskCompletedTimePromise.push(self.getRecentTask(i).getText(), self.getRecentTarget(i).getText(), self.getRecentTaskCompleteDate(i).getText());
            }

            console.log('Before executing promises.');

            Q.all(taskCompletedTimePromise).done(function (result) {
                var taskTimeArray = [];
                console.log('All promises executed.');

                // Merge task name and complete time
                for (var i = 0; i < result.length; i=i+3){
                    taskTimeArray.push(result[i]+'+'+result[i+1]+'+'+result[i+2]);
                }
                result =taskTimeArray;

                // // Data for debug
                // result = ["task1+vm+23\/03\/2016 08:57:10",
                //          "task1+vm+23\/03\/2016 08:57:40",      // * = 1
                //          "task1+vm+23\/03\/2016 08:57:20",
                //          "task2+vm+23\/03\/2016 08:57:40",      // *
                //          "task1+vm+23\/03\/2016 08:57:30",      // -
                //          "task1+vm+23\/03\/2016 08:57:40",      // * = 5
                //          "task1+vm+22\/03\/2016 08:57:30",      //          - = 6
                //          "task1+vm2+22\/03\/2016 08:57:30"];     //         - = 7
                //result = ["task1+vm+23\/03\/2016 08:57:10",
                //          "task1+vm+23\/03\/2016 08:57:10"]


                // Check if has duplicated time
                var dupTimeArray = self.getArrayDuplicates(result);

                // Split task name and time stamp
                for (var i = 0; i < result.length; i++){
                    var taskTime = result[i].split("+");
                    result[i] = taskTime[2];
                }

                // Change the rest of duplicated time to -Infinity, but keep the first
                for (var dupTime in dupTimeArray){
                    console.log("dupTimeArray " + dupTime + " = " + dupTimeArray[dupTime]);
                    for (var i = 1; i < dupTimeArray[dupTime].length; i++){
                        result[dupTimeArray[dupTime][i]] = -Infinity;
                    }
                }

                console.log(result);


                for (var i = 0; i < result.length; i++) {
                    console.log('result[' + i + '] ' + result[i]);
                    if(result[i] != -Infinity){
                    if (browser.params.i18n.lang == 'de-de') {
                        // change date format before creating new date e.g. 23.03.2016 08:57:40 to 2016/03/23 08:57:40
                        console.log("Locale: " + browser.params.i18n.lang);
                        var taskDateAndTime = result[i].split(' ');
                        console.log("taskDateAndTime: " + taskDateAndTime);
                        var taskDate = taskDateAndTime[0].split('.');
                        console.log("taskDateAndTime: " + taskDate);
                        result[i] = taskDate[2] + '\/' + taskDate[1] + '\/' + taskDate[0] + ' ' + taskDateAndTime[1];
                        console.log('result de [' + i + '] ' + result[i]);
                    }

                    if (browser.params.i18n.lang == 'fr-fr' || browser.params.i18n.lang == 'es-es') {
                        // change date format before creating new date e.g. 23/03/2016 08:57:40 to 2016/03/23 08:57:40
                        console.log("Locale: " + browser.params.i18n.lang);
                        var taskDateAndTime = result[i].split(' ');
                        console.log("taskDateAndTime: " + taskDateAndTime);
                        var taskDate = taskDateAndTime[0].split('/');
                        console.log("taskDateAndTime: " + taskDate);
                        result[i] = taskDate[2] + '\/' + taskDate[1] + '\/' + taskDate[0] + ' ' + taskDateAndTime[1];
                            console.log('result fr es [' + i + '] ' + result[i]);
                    }

                        // Check if it is correct time format, just in case task is still running and no time stamp
                    if (result[i].indexOf('\/') > -1 && result[i].indexOf(':') > -1) {
                        //if (result[i].indexOf('\/') > -1 && result[i].indexOf('+') > -1) {
                        result[i] = new Date(result[i]).getTime();
                        console.log('result[' + i + '] time ' + result[i]);
                    }else{
                        hasError = true;
                    }
                }
                }

                var latestTaskCompleteTime = Math.max.apply(Math, result);
                console.log("latestTaskCompleteTime " + latestTaskCompleteTime.toString());

                var latestTaskCompleteTimeIndex = result.indexOf(latestTaskCompleteTime) + 1;
                console.log("latestTaskCompleteTimeIndex " + latestTaskCompleteTimeIndex);
                rows.push(latestTaskCompleteTimeIndex);
                console.log("Latest task completed row Numbers " + rows);

                if(count > 1){
                result[latestTaskCompleteTimeIndex - 1] = -Infinity; //temporarily replacing the latest value with -Infininty:
                    console.log("Second results:  " + result);

                    var secondTaskCompleteTime = Math.max.apply(Math, result);
                    console.log("secondTaskCompleteTime " + secondTaskCompleteTime.toString());
                    var secondTaskCompleteTimeIndex = result.indexOf(secondTaskCompleteTime) + 1;
                    console.log("secondTaskCompleteTimeIndex " + secondTaskCompleteTimeIndex);

                    rows.push(secondTaskCompleteTimeIndex);
                    console.log("Latest task completed row Numbers " + rows);
                }

                if (count > 2) {
                    result[secondTaskCompleteTimeIndex - 1] = -Infinity; //temporarily replacing the latest value with -Infininty:
                    console.log("Third results:  " + result);

                    var thirdTaskCompleteTime = Math.max.apply(Math, result);
                    console.log("thirdTaskCompleteTime " + thirdTaskCompleteTime.toString());
                    var thirdTaskCompleteTimeIndex = result.indexOf(thirdTaskCompleteTime) + 1;
                    console.log("thirdTaskCompleteTimeIndex " + thirdTaskCompleteTimeIndex);

                    rows.push(thirdTaskCompleteTimeIndex);
                    console.log("Latest task completed row Numbers " + rows);

                }


                //result[latestTaskCompleteTimeIndex - 1] = latestTaskCompleteTime;
                //console.log("Results:  " + result);

                console.log('before deferred.resolve');

                if (hasError) {
                    deferred.resolve(false);
                }else {
                    deferred.resolve(rows);
                }

            }, function (error) {
                console.log('Error on getRowNumOfLatestCompletedTask: ' + error);
                deferred.resolve(false);
            });

        }, function (error) {
            console.log('Error on getRowNumOfLatestCompletedTask ', error);
            deferred.resolve(false);
        });
        return deferred.promise;

    };

    this.getArrayDuplicates = function (array) {
        var duplicates = {};
        for (var i = 0; i < array.length; i++) {
            if(duplicates.hasOwnProperty(array[i])) {
                duplicates[array[i]].push(i);
            } else if (array.lastIndexOf(array[i]) !== i) {
                duplicates[array[i]] = [i];
            }
        }

        return duplicates;
    };


};


module.exports = EsxuiUtil;