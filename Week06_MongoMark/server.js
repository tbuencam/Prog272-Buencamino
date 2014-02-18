/**
 * @author Terence Buencamino
 * This code imports the CreateJson module to instantiate an object of that type. It uses routes to hand off applicable content to the client.
 */
 /* jshint strict:true */
 
var express = require('express');
var app = express();
var fs =require('fs');  // To read and write files to/from the file system.
// Import my CreateJson library. Needed for the QueryMongo object.
var mDProcessor = require('./Library/CreateJson');  // This (mDProcessor) is the handle to the object, a sort of markdown Processor.
var port = process.env.PORT || 30025;


// Route 1. (Uses get) Pushes the markdown from DataIn.md into Mongo.
app.get('/readMDIntoMongo', function(request, response) { 'use strict';
	console.log('readMDIntoMongo called to read DataIn.md and push it into the DB');
	var data = mDProcessor.QueryMongo.getData(response);
	response.send({ "result": data });
});


// Route 2. (Uses get) Reads the markdown object from Mongo and converts it to HTML.
app.get('/writeMongoToHTML', function(request, response) { 'use strict';
	console.log('writeMongoToHTML called to read MD from DB, convert to HTML, and send back.');
	var data = mDProcessor.QueryMongo.pullAndConvert(response);
	console.log('Returned from pullAndConvert');
	response.send({ "result": data });
});

// Served up as the default page when a request comes from the client.
app.get('/', function(request, result){ 'use strict';
    var html = fs.readFileSync(__dirname + '/Public/index.html');
    result.writeHeader(200, {"Content-Type": "text/html"});   
    result.write(html);
    result.end();
});

// Give express access to the Public directory.
app.use("/", express.static(__dirname + '/Public'));

app.listen(port);
console.log('Listening on port :' + port);
