/**
 * @author Terence Buencamino
 */
 /* jshint strict:true */

var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');  // Required for deleting by ID.
var fs = require('fs');  // Need Express to read from the JSON file.


var QueryMongo = (function() {'use strict';

	var response = null;
	var database = null;
	var configFile = './Library/config.json';  // The configuration file to read.
	var url = null;  // The URL to connect to the Mongo DB. Read from config.json in constructor.
	var targetCollection = null;  // The collection name for this project (midterm).
	var inputFile = null;  // The JSON file to read to populate the collection. Read from config.json in constructor.
	var addRecordFile = null; // The JSON file to read to add a record. Read from config.json in constructor.
	

	// Constructor.
	function QueryMongo() {
		
		// TEST: Connecting to MongoLab instead.
		// url = 'mongodb://tbuencam:Ital1an0@ds053708.mongolab.com:53708/buencamino01';  // MongoError: auth fails
		// Error: URL must be in the format mongodb://user:pass@host:port/dbname		
		
		// Read configuration from config.json:
		var configContent = fs.readFileSync(configFile, 'utf8');  // Read the configuration file.
		var configuration = JSON.parse(configContent);  // Parse the configuration file contents into an array.
		
		var config = JSON.stringify(configContent, null, 0);	//	DBUG only
		console.log("Configuration: " + config);
		
		// Set the DB URL, collection name, data input file, and extra record file from the settings in config JSON.
		url = configuration[0].url;
		console.log("url: " + url);
			
		targetCollection = configuration[0].targetCollection;  // Set the target collection to 'Poems.'	
		console.log("targetCollection: " + targetCollection);
		
		inputFile = configuration[0].inputFile;  // Set the input file collection to 'Shakespeare.json'.	
		console.log("inputFile: " + inputFile);
		
		addRecordFile = configuration[0].addRecordFile;  // Set the file collection to 'Data.json.'	
		console.log("addRecordFile: " + addRecordFile);
					
	}  // End constructor

	var getDatabase = function(func) {
		console.log('Called getData');
		if (database !== null) {
			console.log('database exists');
			database.open(function(err, database) {
				if (err) {
					throw err;
				}
				func(database);
			});
		} else {
			console.log('Querying for database');
			MongoClient.connect(url, function(err, databaseResult) {
				if (err) {
					throw err;
				}
				database = databaseResult;
				func(database);
			});
		}
	}; // End getDatabase

	
	QueryMongo.prototype.getCollection = function(initResponse) {
		console.log("getCollection called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(targetCollection);

			// Send the collection to the client.
			//collection.find().sort({title:1}).toArray(function(err, theArray) { // Try sorting by title in ascending order.
			collection.find().toArray(function(err, theArray) {
				theArray.sort(function compare(a, b) {
					var numberA = a.title.slice(7, a.title.length);
					numberA = padNumber(numberA, 3, 0);
					// console.log(numberA);
					var numberB = b.title.slice(7, b.title.length);
					numberB = padNumber(numberB, 3, 0);
					if (numberA < numberB)
						return -1;
					if (numberB < numberA)
						return 1;
					// a must be equal to b
					return 0;
				});
				// console.dir(theArray);
				database.close();
				//console.log("Sending the array");
				response.send(theArray);
			});
		});
	};  // End getCollection
	
	
	// Private helper function called by getCollection to assist in sorting.
	var padNumber = function(numberToPad, width, padValue) {
		padValue = padValue || '0';
		numberToPad = numberToPad + '';
		if (numberToPad.length >= width) {
			return numberToPad;
		} else {
			return new Array(width - numberToPad.length + 1).join(padValue) + numberToPad;
		}
	}; // End padNumber
	
	
	// Create the entire Poems collection from Shakespeare.json.
	QueryMongo.prototype.createRecordsfromJSONFile = function(initResponse) {
		console.log("Called createRecordsfromJSONFile in QueryMongo");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(targetCollection);
			
			// The input file is read from config.json.
			var fileContent = fs.readFileSync(inputFile, 'utf8');
			var newRecord = JSON.parse(fileContent);
			
			// First, zero out the existing collection. Insert happens in the callback to ensure the collection was first zeroed out.
			collection.remove(function(err) {
				console.log("Removing/zeroing out collection.");
				if (err) {
					throw err;
				}
				console.log("In callback of removing collection. Calling insert to create the collection.");
						
				collection.insert(newRecord, function(err) {		
					if (err) {
					throw err;
					}	
					database.close();
					console.log("Poems collection created.");
					response.send({result:'Success'});   // For testing
				});// End insert
				
			}); // End remove all documents from the collection and insert fresh.	
		}); // End getDatabase
	};  // End createRecordsfromJSONFile	
	
	// Add a single record read locally from Data.json.
	QueryMongo.prototype.addRecordfromJSONFile = function(initResponse) {
		console.log("Called addRecordfromJSONFile in QueryMongo");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(targetCollection);
			
			var fileContent = fs.readFileSync(addRecordFile, 'utf8');  // Value of addRecordFile is read in from config.json in the constructor.
			var newRecords = JSON.parse(fileContent);  // This is a bulk insert.
			
			collection.insert(newRecords, function(err) {		
				if (err) {
				throw err;
				}	
				database.close();
				console.log("Insert succeeded");
				response.send({result:'Success'});
			}); // End insert
		});
	};  // End addRecordfromJSONFile
	

    // Removes the currently selected poem from the collection by using the value of _id.
	QueryMongo.prototype.removeRecordfromCollection = function(initResponse,id) {
		console.log("QueryMongo.removeById called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(targetCollection);
			var idString = ""+id;  // Does this automatically convert it to a string?
			console.log("idString: "+idString);
			collection.remove({ "_id" : mongodb.ObjectID(idString)}, function(err, data) {
				if (err) {
					throw err;
				}
				database.close();
				console.log("Item deleted");
			}); 
			
		});
	}; // End removeRecordfromCollection	
	

	return QueryMongo;

})();


exports.QueryMongo = new QueryMongo();
