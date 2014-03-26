define(['jquery'], function() {'use strict';

    var buttons = null;
    var options = null;
    var transformOptions = null;
    var dataIndex = 0;
    var dataIndexTransform = 0;

	// Constructor.
    function AwsUi() {
        $("#listBuckets").click(listBuckets);
        $("#copyToS3").click(copyToS3);
        $("#getOptions").click(getOptions);
        $("#transformForwardButton").click(forwardTransform);
        $("#tranformBackButton").click(backwardTransform);
        $("#forwardButton").click(forward);
        $("#backButton").click(backward);
        $("#buildAll").click(buildAll);        
        $("#downloadPoems").click(downloadPoems);     
        $("#updateStaging").click(updateStaging);
        $("#updatePublishing").click(updatePublishing);

        console.log("In AwsUi constructor, calling getBuildConfig.");
        getBuildConfig();
        console.log("In AwsUi constructor, calling getOptions.");
        getOptions();
    }

	// Fetches 5 poems from the Poems collection and writes them out as markdown to a folder in the StackEdit directory.  
    var downloadPoems = function() {
		var targetDir = $('#downloadFilesTo').val();
		console.log("Target directory is: " + targetDir);
		var request = {};
		request.targetDir = targetDir;  // Set the target base directory.		
        $.getJSON("/downloadPoems", request, function(poemData) {
			console.log("downloadPoems called");
			console.log("Poems fetched:");
			console.log(JSON.stringify(poemData));  // DBUG
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    }; // End downloadPoems

    var buildAll = function() {
        $.getJSON("/buildAll", {
            options : JSON.stringify(transformOptions),
            index : dataIndexTransform
        }, function(result) {
            $("#buildData").empty();
            var fileArray = result.data.split("\n");
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].length > 0) {
                    $("#buildData").append("<li>" + fileArray[i] + "</li>");
                }
            }
        });
    }; // End buildAll
 
	// Reads staging configuration data from the UI fields, packages it, and sends it to app.js for processing.
   var updateStaging = function() {
		var pathToPython = $("#pathToPython").val();
		var copyFrom = $("#copyFrom").val();
		var copyTo = $("#copyTo").val();
		// Make filesToCopy into an array.
		var filesToCopy = [];
		filesToCopy = $("#filesToCopy").val().split(',');

        $.getJSON("/updateStaging", {
            options : JSON.stringify(transformOptions),
            index : dataIndexTransform,
            newPathToPython : pathToPython,
            newCopyFrom : copyFrom,
            newCopyTo : copyTo,
            newFilesToCopy : filesToCopy,
        }, function(result) {
			// Refreshing the section from the database by calling getBuildConfig.
			getBuildConfig();            
        });
    }; // End updateStaging
    
	// Reads publishing configuration data from the UI fields, packages it, and sends it to app.js for processing.
   var updatePublishing = function() {
		var pathToConfig = $("#pathToConfig").val();
		var reallyWrite = $("#reallyWrite").val();  
		var bucketName = $("#bucketName").val();
		var folderToWalk = $("#folderToWalk").val();
		var s3RootFolder = $("#s3RootFolder").val();
		var createFolderToWalkOnS3 = $("#createFolderToWalkOnS3").val();
		var createIndex = $("#createIndex").val();
		// Make filesToIgnore into an array.
		var filesToIgnore = [];
		filesToIgnore = $("#filesToIgnore").val().split(',');

        $.getJSON("/updatePublishing", {
            options : JSON.stringify(options),
            index : dataIndex,            
            newPathToConfig : pathToConfig,
            newReallyWrite : reallyWrite,
            newBucketName : bucketName,
            newFolderToWalk : folderToWalk,
            newS3RootFolder : s3RootFolder,
            newCreateFolderToWalkOnS3 : createFolderToWalkOnS3,
            newCreateIndex : createIndex,
            newFilesToIgnore : filesToIgnore,       
        }, function(result) {
			// Refreshing the section from the database by calling getOptions.
			getOptions();       
        });
    }; // End updatePublishing
       

    var copyToS3 = function() {
        $.getJSON("/copyToS3", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            $("#copyResult").html("Result: " + data.result);
        });
    };

	// Displays the build/staging (Transform Configuration) information in the first section. 
    var displayTransformConfig = function(options) {
        $("#pathToPython").val(options.pathToPython);
        $("#copyFrom").val(options.copyFrom);        
        $("#copyTo").val(options.copyTo);       
        $("#filesToCopy").val(options.filesToCopy);        
    }; // End displayTransformConfig

	// Displays the publishing (Copy to S3) information in the second section.
    var displayOptions = function(options) {
        $("#currentDocument").html(dataIndex + 1); // This is just a <p>.
        $("#pathToConfig").val(options.pathToConfig);
        $("#reallyWrite").val(options.reallyWrite ? "true" : "false");
        $("#bucketName").val(options.bucketName);
        $("#folderToWalk").val(options.folderToWalk);
        $("#s3RootFolder").val(options.s3RootFolder);
        $("#createFolderToWalkOnS3").val(options.createFolderToWalkOnS3 ? "true" : "false");
        $("#createIndex").val(options.createIndex ? "true" : "false");
        $("#filesToIgnore").val(options.filesToIgnore);
    };

	// Fetches the data and calls displayTransformConfig to populate the first section.
    var getBuildConfig = function() {
        $.getJSON("/getBuildConfig", function(optionsInit) {
            transformOptions = optionsInit;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };
    
	// Fetches the data and calls displayOptions to populate the second section.
    var getOptions = function() {
        $.getJSON("/getOptions", function(optionsInit) {
            options = optionsInit;
            $('#documentCount').html(options.length);
            displayOptions(options[0]);
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };

    var forwardTransform = function() {
        if (dataIndexTransform < transformOptions.length - 1) {
            dataIndexTransform++;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }
    };

    var backwardTransform = function() {
        if (dataIndexTransform > 0) {
            dataIndexTransform--;
            displayTransformConfig(transformOptions[dataIndexTransform]);
            return dataIndexTransform;
        }
        return dataIndexTransform;
    };

    var forward = function() {
        if (dataIndex < options.length - 1) {
            dataIndex++;
            displayOptions(options[dataIndex]);
        }
    };

    var backward = function() {
        if (dataIndex > 0) {
            dataIndex--;
            displayOptions(options[dataIndex]);
            return true;
        }
        return false;
    };

    var listBuckets = function() {
        $.getJSON("/listBuckets", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                $("#buckets").append("<li>" + data[i] + "</li>");
            }
        });
    };

    return AwsUi;
});
