/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var walkDirs = require("./Source/WalkDirs").walkDirs;
var s3Code = require("./Source/S3Code");
var fs = require("fs");
var exec = require('child_process').exec;
var qm = require('./Source/QueryMongo');
var queryMongo = qm.QueryMongo;

var app = express();

// All environments.
app.set('port', process.env.PORT || 30025);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Source')));
app.use(express.static(path.join(__dirname, 'Images')));
app.use(express.favicon('Images/favicon16.ico'));

// Development only.
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(request, response) { 'use strict';
    var html = fs.readFileSync(__dirname + '/public/index.html');
    response.writeHeader(200, {"Content-Type": "text/html"});   
    response.write(html);
    response.end();
});

// Reads the Poems collection and writes the first 5 poems to a directory in the StackEdit folder.
app.get('/downloadPoems', function(request, response) {'use strict';
	console.log("In app.js, downloadPoems called");
	var targetDir = request.query.targetDir;  // The request object specifies the target directory.
	console.log("In app.js, target directory is: " + targetDir);
	queryMongo.downloadPoems(response, 'Poems', targetDir);  // Passing in collection name and target directory.
});

// Reads from Mongo database instead of the file system.
app.get('/getOptions', function(request, response) {'use strict';
	console.log("In app.js, getOptions Express called");
	queryMongo.getCollection(response, 'CopytoAwsOptions');  // Passing in collection name.
});

app.get('/listBuckets', function(request, response) {'use strict';
    console.log("ListBuckets called");
    console.log(request.query);
	var options = JSON.parse(request.query.options);
	console.log("ListBuckets: ", options.pathToConfig);
	s3Code.loadConfig(options.pathToConfig);
	s3Code.listBuckets(response, true);
});

app.get('/copyToS3', function(request, response) {'use strict';
	console.log(typeof request.query.options);	
	var options = JSON.parse(request.query.options);
	console.log(options);
	walkDirs(options, response);
});

var buildAll = function(response, config, index) { 'use strict';
	console.log("BuildAll was called");
	var config = fs.readFileSync("MarkdownTransformConfig.json", 'utf8');	
	config = JSON.parse(config);
	console.log("Index is: " + index);
		
	var command = config[index].pathToPython + " MarkdownTransform.py -i " + index;	
	try {
		exec(command, function callback(error, stdout, stderr) {
			// Read in the HTML send the HTML to the client
			console.log("convertToHtml was called er: ", error);
			console.log("convertToHtml was called so: ", stdout);
			console.log("convertToHtml was called se: ", stderr);
			response.send({ "result": "Success", "data": stdout });
		});
	} catch(e) {
		console.log(e.message);
		response.send( { "result" : "error", "data": e });
	}
};

app.get('/buildAll', function(request, response) { 'use strict';
	console.log("buildAll called");	
	var options = request.query.options;
	console.log("Writing options from request.query to JSON file:");
	console.log(options);
	fs.writeFileSync("MarkdownTransformConfig.json", options);	
	buildAll(response, options, request.query.index);
});

app.get('/updateStaging', function(request, response) { 'use strict';
	console.log("updateStaging called");
	// Call the applicable QueryMongo method with the request to do the update.
	console.log("Calling queryMongo.updateTCOCollection");
	queryMongo.updateTCOCollection(request, response);  
});

app.get('/updatePublishing', function(request, response) { 'use strict';
	console.log("updatePublishing called");
	// Call the applicable QueryMongo method with the request to do the update.
	console.log("Calling queryMongo.updateCTACollection");
	queryMongo.updateCTACollection(request, response);
});

// Reworked to read from Mongo database. Call getCollection with parameter for collection.
app.get('/getBuildConfig', function(request, response) { 'use strict';
	console.log('In app.js, getBuildConfig called');
	queryMongo.getCollection(response, 'TransformCopyOptions');  // Passing in collection name.
});

http.createServer(app).listen(app.get('port'), function() {'use strict';
	console.log('Express server listening on port ' + app.get('port'));
});
