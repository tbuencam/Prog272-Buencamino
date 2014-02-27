/**
 * @author Terence Buencamino
 */
 /* jshint strict:true */
 
var express = require('express');
var app = express();
var format = require('util').format;
var fs = require('fs');
var qm = require('./Library/QueryMongo');
var queryMongo = qm.QueryMongo; 

// Read the collection
app.get('/readAll', function(request, response) {'use strict';
	queryMongo.getCollection(response);
});

// Creates the entire Poems collection from Shakespeare.json.
app.get('/createRecords', function(request, response) {'use strict';
	console.log('In /createRecords in Server.js. Calling queryMongo.createRecordsfromJSONFile.');
	queryMongo.createRecordsfromJSONFile(response);
});

// Insert a single record read from Data.json into the collection.
app.get('/addRecord', function(request, response) {'use strict';
	console.log('In /addRecord in Server.js. Calling queryMongo.addRecordfromJSONFile.');
	queryMongo.addRecordfromJSONFile(response);
});

// Removes the currently selected record from the collection.
app.get('/deleteRecord', function(request, response) {'use strict';
	console.log('In /deleteRecord in Server.js. Calling queryMongo.removeRecordfromCollection.');
	console.log(request.query);
	var recordToDelete = request.query.idRequested;  // Coming in as a string. (ID is a string so no need to parseInt.)
	console.log("Record to delete: " + recordToDelete);
	queryMongo.removeRecordfromCollection(response, recordToDelete);
});

// Default.
app.get('/', function(request, result) {'use strict';
	var html = fs.readFileSync(__dirname + '/Public/index.html');
	result.writeHeader(200, { "Content-Type" : "text/html" });
	result.write(html);
	result.end();
});

app.use("/", express.static(__dirname + '/Public'));
app.use("/", express.static(__dirname + '/Library'));

app.listen(30025);
console.log('Listening on port 30025');
