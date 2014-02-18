/**
 * @author Terence Buencamino
 * Object named 'QueryMongo' with public methods:
 * getData - Reads a markup file and writes it to the database.
 * pullAndConvert - Reads that file from the database, converts it to markup, and sends this to the caller.
 */
  /* jshint strict:true */

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs =require('fs');  // To read and write files to file system.

var QueryMongo = (function() { 'use strict';

	var url01 = 'mongodb://127.0.0.1:27017/test';
	var url02 = 'mongodb://192.168.2.19:27017/test';
	var url03 = 'mongodb://192.168.2.34:27017/test';
	var url04 = 'mongodb://192.168.56.101:27017/test';

	function QueryMongo() {

	}

    // Public method 1:
	QueryMongo.prototype.getData = function(result) { 'use strict';
		console.log('Called getData');
		
		var inFileString = './Public/DataIn.md';  // Set the source .md file.		
		// Synchronouly read in the .md file into a variable.
		var fileContent = fs.readFileSync(inFileString, 'utf8', function(err, data){ 'use strict';
	        if (err) throw err;
	        console.log('Read DataIn.md.');
		});
 
		
		// Open the test database that comes with MongoDb
		MongoClient.connect(url01, function(err, database) { 'use strict';
			if (err) {
				throw err;
			}
			console.log('IngetDataCallback');
			
			// Create the object from the file name and file content read.
			var fileName = 'DataIn.md'
			console.log('Filename value to insert: '+ fileName);
			console.log('Content value to insert: \n'+ fileContent);	
			console.log('Inserting record into collection');			
			insertIntoCollection(database, 'markdown_db', {"fileName":fileName, "fileContent":fileContent});
		});
	}; // End getData
	
	
	// Public method 2:
    // Reads from the database, saves out the file, then converts file to HTML using pandoc. No params for now. TODO: Test removing the result param!
	QueryMongo.prototype.pullAndConvert = function(result) { 'use strict';
		console.log('Called pullAndConvert');
		
		// Open the test database that comes with MongoDb.
		MongoClient.connect(url01, function(err, database) { 'use strict';
			if (err) {
				throw err;
			}
			console.log('InpullAndConvert');
			// Read the first record's fileContent from the DB, set the file name (hardcode), and write the contents to it.
			
            // Set the collection.
		    var collection = database.collection('markdown_db');
		    var outFileString = 'Public/Sources.md';

		    // Get the first record.
		    collection.find().toArray(function(err, theArray) { 'use strict';
			  console.log('Creating Public/Sources.md with content: \n' + theArray[0].fileContent);
			  
			  // Synchronously, write it back to the file system as Sources.md.			
			  fs.writeFileSync(outFileString, theArray[0].fileContent, 'utf8', function(err, data){
		        if (err) throw err;
		        console.log('Wrote Sources.md.');
	          });
					
			database.close();			
		    }); // End collection.find() which reads the record in the DB and writes the file back out to the file system. 
			
		}); // End MongoClient.connect
					
	  // Convert Sources.md to HTML using pandoc.
      console.log('Running pandoc to convert Sources.md'); 
      var exec = require('child_process').exec;
      exec('pandoc -t html5 -o ./Public/Sources.html ./Public/Sources.md', function callback(error, stdout, stderr) { 'use strict';
		  console.log('Done executing pandoc on md file.');
      });	// End exec to convert the doc using pandoc

	};  // End pullAndConvert

	// Will create collection if it does not exist
	var insertIntoCollection = function(db, collectionName, objectToInsert) { 'use strict';

		// First, drop the existing collection, if it exists (so we don't duplicate entries).
		var oldCollection = db.collection(collectionName);	
        oldCollection.remove(function(err) {'use strict';
		    if (err) {
			  throw err;
		    }
		    console.log('Zeroed out existing collection');
	    });

		var collection = db.collection(collectionName);	
		collection.insert(objectToInsert, function(err, docs) { 'use strict';
			if (err) {
				throw err;
			}
			console.log("insert succeeded");
		});
	}; // End insertIntoCollection

    // Return the constructor.
	return QueryMongo;

})();

exports.QueryMongo = new QueryMongo();
