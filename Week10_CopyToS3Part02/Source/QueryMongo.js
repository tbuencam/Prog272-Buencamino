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
	var configFile = './Source/databaseconfig.json';  // The configuration file to read.
	var url = null;  // The URL to connect to the Mongo DB. Read from config.json in constructor.
	var targetCollection = null;  // The collection name for this project (midterm).
	var inputFile = null;  // The JSON file to read to populate the collection. Read from config.json in constructor.
	var addRecordFile = null; // The JSON file to read to add a record. Read from config.json in constructor.
	var collectionObjectTCO = null; // The local collection for Transform Copy Options.
	var collectionObjectCTA = null; // The local collection for Copy to AWS Options.
	

	// Constructor.
	function QueryMongo() {			
		
		// Read configuration from config.json:
		var configContent = fs.readFileSync(configFile, 'utf8');  // Read the configuration file.
		var configuration = JSON.parse(configContent);  // Parse the configuration file contents into an array.
		
		var config = JSON.stringify(configContent, null, 0);	//	DBUG only
		// console.log("Configuration: " + config);
		
		// Set the DB URL, collection name, data input file, and extra record file from the settings in config JSON.
		url = configuration[0].url;
		// url = 'mongodb://127.0.0.1:27017/test';  // To use local Mongo instead of MongoLab, uncomment this and comment out previous statement.
		console.log("url: " + url);
			
		targetCollection = configuration[0].targetCollection;  // Sets the target collection to 'Poems.'	
		console.log("targetCollection: " + targetCollection);
		
		inputFile = configuration[0].inputFile;  // Sets the input file collection to 'Shakespeare.json'.	
		// console.log("inputFile: " + inputFile);
		
		addRecordFile = configuration[0].addRecordFile;  // Sets the file collection to 'Data.json.'	
		// console.log("addRecordFile: " + addRecordFile);
					
	}  // End constructor


	// NOTE: The commented out code here is left in intentionally. This was from your original code but does not work using MongoLab.
	var getDatabase = function(response, collectionName, func) {
		console.log('Called getDatabase');
		if (database !== null) {
			console.log('database exists');
			func(database, response, collectionName);
			/*database.open(function(err, database) {
				if (err) {
					console.log("Problem opening database.");  // There is a problem here when using MongoLab.
					throw err;
				}
				console.log("Database opened.");
				func(database);
			}); */
		} else {
			console.log('Querying for database');
			MongoClient.connect(url, function(err, databaseResult) {
				if (err) {
					console.log("Error in GetDatabase");
					throw err;
				}
				database = databaseResult;
				func(database, response, collectionName);
			});
		}
		console.log("Exiting getDatabase");
	}; // End getDatabase

	
	QueryMongo.prototype.getCollection = function(initResponse, collectionName) {
		console.log("getCollection called");
		console.log("collectionName is " + collectionName);
		response = initResponse;
		
		getDatabase(response, collectionName, function(database, response, collectionName) {
			console.log("In getCollection callback: " + collectionName);
			
			var currentCollection = null;
			
			//if (collectionObjectTCO === null) {
			  //console.log("Getting collectionObjectTCO");
			  //collectionObjectTCO = database.collection(collectionName); // Changed from targetCollection.
		    //}
		    if (collectionName === 'TransformCopyOptions') {
			  console.log("Getting collectionObjectTCO");
			  if (collectionObjectTCO === null) {
			     collectionObjectTCO = database.collection(collectionName); // Changed from targetCollection.
		      }
			  currentCollection = collectionObjectTCO;
		    }
		    else if (collectionName === 'CopytoAwsOptions'){
			  console.log("Getting collectionObjectCTA");
			  if (collectionObjectCTA === null) {
			     collectionObjectCTA = database.collection(collectionName); // Changed from targetCollection.
			  }
			  currentCollection = collectionObjectCTA;				
			}
		    
			// Send the collection to the client. This will be a different collection depending on the call.
			currentCollection.find().toArray(function(err, theArray) {
				if (err) {
					console.log("Error in getCollection: " + err);
				}
				// console.dir(theArray);
				console.log("Found collection item.");
				// database.close();
				//console.log("Sending the array");
				console.log("Sending back the data.");
				console.log(theArray);  // DBUG
				response.send(theArray);
			}); // End find and send back.
			
		});  // End getDatabase
	};  // End getCollection
	
	
	// Create the entire Poems collection from Shakespeare.json.
	QueryMongo.prototype.createRecordsfromJSONFile = function(initResponse) {
		console.log("Called createRecordsfromJSONFile in QueryMongo");
		response = initResponse;
		getDatabase(function(database) {
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
					//database.close();
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
				//database.close();
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
				//database.close();
				console.log("Item deleted");
			}); 
			
		});
	}; // End removeRecordfromCollection	
	

	return QueryMongo;

})();


exports.QueryMongo = new QueryMongo();
