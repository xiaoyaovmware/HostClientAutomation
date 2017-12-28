'use strict';

var request = require('request');
var fs = require('fs');
var Q = require('q');

var RaceTrack = function () {
    var self = this;
    //import LocalLog.LocalLog;
    var raceTrackServer = "racetrack.eng.vmware.com";

    var testCaseID = null;
    //var testCaseResult = null;
    var TESTTYPES = ["BATS", "Smoke", "Regression", "DBT", "Unit", "Performance"];
    var LANGUAGES = ["English", "Japanese", "French", "Italian", "German", "Spanish",
        "Portuguese", "Korean", "Chinese Simplify",
        "Chinese Traditional", "Russian", "Dutch", "Nederlands"];
    //var RESULTTYPES = ["PASS","FAIL","RUNNING", "CONFIG", "SCRIPT", "PRODUCT", "RERUNPASS", "UNSUPPORTED"];


    /**
     * Returns a new test set ID on success or null on failure.
     Param          Required?   Description
     BuildID        Yes         The build number that is being tested
     User           Yes         The user running the test
     Product        Yes         The name of the product under test
     Description    Yes         A description of this test run
     HostOS         Yes         The Host OS
     ServerBuildID  No          The build number of the "server" product
     Branch         No          The branch which generated the build
     BuildType      No          The type of build under test
     TestType       No          default Regression
     Language       No          default English
     * @throws IOException
     */
    this.testSetBegin = function (BuildID, User, Product, Description, HostOS, ServerBuildID, Branch, BuildType, TestType, Language) {
        //var result = "";

        if (Language != null && LANGUAGES.indexOf(Language) <= -1) {
            console.log("testSetBegin: Specified language is invalid - " + Language);
            return null;
        } else if (TestType != null && !TESTTYPES.indexOf(TestType) <= -1) {
            console.log("testSetBegin: Specified test type is invalid - " + TestType);
            return null;
        } else {
            var deferred = Q.defer();

            var params = {
                "BuildID": BuildID,
                "User": User,
                "Product": Product,
                "Description": Description,
                "HostOS": HostOS,
                "ServerBuildID": ServerBuildID,
                "Branch": Branch,
                "BuildType": BuildType,
                "TestType": TestType,
                "Language": Language
            };
            this.post("TestSetBegin.php", params, function (result) {
                browser.params.raceTrack.testSetID = result;
                console.log("browser.params.raceTrack.testSetID " + browser.params.raceTrack.testSetID);
                deferred.resolve(result);

            });
            return deferred.promise;
        }

    };


    /**
     * testSetEnd - End the test set

     Param          Required?        Description
     testSetID             No          The test set/run that is being completed.
     * @return
     * @throws IOException
     */
    this.testSetEnd = function () {
        console.log("testSetID in testSetEnd: " + browser.params.raceTrack.testSetID);
        if (browser.params.raceTrack.testSetID != '') {
            //var result = "";
            var deferred = Q.defer();

            var params = {
                "ID": browser.params.raceTrack.testSetID
            };

            this.post("TestSetEnd.php", params, function (result) {
                //console.log(result);
                deferred.resolve(result);
            });

            return deferred.promise;
        }
    };


    ///**
    // * testCaseBegin - Start a new test case
    //
    // Param          Required?   Description
    // Name           Yes         The name of the test case
    // Feature        Yes         The feature that is being tested
    // Description    No          A description of this test case
    // MachineName    No          The host that the test is running against
    // TCMSID         No          A comma-separated Testlink (TCMSID) ID's.
    // InputLanguage  No          abbreviation for the language used eg 'EN'
    // ResultSetID    No          The test set/run that is being completed. (We will use the testSetID which is created in testSetBegin)
    // Type                       "UI", "API", "PDP", "Keyboard"
    // TestPriority               "p0", "p1", "p2", "p3"
    // Method                     "Automation", "Manual"
    // * @return
    // * @throws IOException
    // */
    this.testCaseBegin = function (Name, Feature, Description, InputLanguage, MachineName, TCMSID, Type, TestPriority, Method) {

        if (browser.params.raceTrack.testSetID == '') {
            console.log("testCaseBegin called but there is no active test set.");
        } else {
            browser.params.raceTrack.testCaseID = '';

            var deferred = Q.defer();

            var params = {
                "Name": Name,
                "Feature": Feature,
                "Description": Description,
                "MachineName": MachineName,
                "TCMSID": TCMSID,
                "InputLanguage": InputLanguage,
                "ResultSetID": browser.params.raceTrack.testSetID,
                "Type": Type,
                "TestPriority": TestPriority,
                "Method": Method
            };

            this.post("TestCaseBegin.php", params, function (result) {
                if (result != null) {
                    browser.params.raceTrack.testCaseID = result;
                    console.log("browser.params.raceTrack.testCaseID " + browser.params.raceTrack.testCaseID);
                    deferred.resolve(result);
                }
            });
            return deferred.promise;

        }
    };

    this.testCaseEnd = function (Result) {
        console.log("testCaseID in testCaseEnd: " + browser.params.raceTrack.testCaseID);

        var deferred = Q.defer();

        var params = {
            "Result": Result,
            "ID": browser.params.raceTrack.testCaseID
        };

        this.post("TestCaseEnd.php", params, function (result) {
            browser.params.raceTrack.testCaseID = '';
            //console.log(result);
            deferred.resolve(result);
        });
        return deferred.promise;

    };


    // "Locale":
    // HostOSPlatform ["x86", "x64"]
    // BrowserType ["Firefox", "Chrome", "Safari", "IE", "Opera"]


    this.testSetData = function (Name,Value) {

        if (browser.params.raceTrack.testSetID == '') {
            console.log("testCaseBegin called but there is no active test set.");
        } else {

            var deferred = Q.defer();

            var params = {
                "ResultSetID": browser.params.raceTrack.testSetID,
                "Name":Name,
                "Value":Value,
            };

            this.post("TestSetData.php", params, function (result) {
                deferred.resolve(result);
            });
            return deferred.promise;

        }
    };

    this.log = function (Description) {
        console.log(new Date().toLocaleTimeString() + ": " + Description);
        if (browser.params.raceTrack.testCaseID == null) {
            console.log("Racetrack.Comment(): there is no test case ID.");
        } else {
            var deferred = Q.defer();

            var params = {
                "Description": Description,
                "ResultID": browser.params.raceTrack.testCaseID
            };

            this.post("TestCaseComment.php", params, function (result) {
                deferred.resolve(result);
            });

            return deferred.promise;
        }
    };


    ///**
    // * Param          		Required?   Description
    // * @param Description	Yes         The comment
    // * @param Actual		Yes         The actual value. (any string)
    // * @param Expected		Yes         The expected value. (any string)
    // * @param Screenshot	No          A screenshot associated with the (failed) verification
    // * @return
    // * @throws IOException
    // */
    this.verify = function (Description, Actual, Expected) {
        console.log(Description);

        if (browser.params.raceTrack.testCaseID == null) {
            console.log("verify(): verify called but there is no active test case.");
        } else {
            var deferred = Q.defer();
            var result;

            if (Actual == null) {
                logger.log("verify(): Error - Actual is null.");
                result = "FALSE";
            }
            if (Expected == null) {
                logger.log("verify(): Error - Expected is null.");
                result = "FALSE";
            }
            if (Actual === Expected) {
                result = "TRUE";
            }else {
                result = "FALSE";
            }

            var params = {
                "Description": Description,
                "ResultID": browser.params.raceTrack.testCaseID,
                "Actual": Actual,
                "Expected": Expected,
                "Result": result
            };

            this.post("TestCaseVerification.php", params, function (result) {
                deferred.resolve(result);
            });
            return deferred.promise;
        }
    };

    this.uploadScreenshot = function (screenshotPath, screenshotName) {

        var deferred = Q.defer();

        //console.log('Screenshot path: ' + screenshotPath+screenshotName);
        var formData = {
            "Description": "Error Screenshot",
            "ResultID": browser.params.raceTrack.testCaseID,
            //"Screenshot": fs.createReadStream('TestResults\\should_redirect_an_unconfigured_order_to_configuration_pageundefined.png'),
            "Screenshot": fs.createReadStream(screenshotPath + screenshotName + '.png'),
            "filename": "error.png"
        };
        if (browser.params.raceTrack.log) {
            request.post({
                url: 'https://racetrack.eng.vmware.com/TestCaseScreenshot.php',
                formData: formData
            }, function optionalCallback(err, httpResponse, body) {
                deferred.resolve(body);
                if (err) {
                    console.log("Upload screenshot error:" + err);
                }
            });
        }
        return deferred.promise;
    };

    this.post = function (webServiceMethod, params, callback) {

        var options = {
            url: "https://" + raceTrackServer + "/" + webServiceMethod,
            method: 'POST',
            form: params,
        };

        //console.log('browser.params.raceTrack.log: ' + browser.params.raceTrack.log);

        if (browser.params.raceTrack.log) {
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    return callback(body);
                } else {
                    return callback("Racetrack post error: " + error + " Body: " + body)
                }
            });
        }else{
            return callback('Logging is switch off.');
        }

    };


};
module.exports = RaceTrack;