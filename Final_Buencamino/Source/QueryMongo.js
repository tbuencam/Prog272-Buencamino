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
	var collectionObjectPoems = null; // The local collection for Poems.
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


	var getDatabase = function(response, collectionName, func) {
		console.log('Called getDatabase');
		if (database !== null) {
			console.log('database exists');
			func(database, response, collectionName);
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


	// Reads the Poems collection and writes the first 5 poems to a directory in the StackEdit folder.
	// What's the Mongo command for getting just the first 5 records?? Or should I get all and just write the first 5 to file system?
	QueryMongo.prototype.downloadPoems = function(initResponse, collectionName, targetDir) {
		console.log("downloadPoems called");
		console.log("collectionName is " + collectionName);
		response = initResponse;
		var baseDir = targetDir;
		
		getDatabase(response, collectionName, function(database, response, collectionName) {
			console.log("In downloadPoems callback: " + collectionName);
			
			var currentCollection = null;
			
			  console.log("Getting collectionObjectPoems");
			  if (collectionObjectPoems === null) {
			     collectionObjectPoems = database.collection(collectionName);
		      }
			  currentCollection = collectionObjectPoems;
	    
			// Write the files to the local system and send the collection to the client.
			currentCollection.find().toArray(function(err, theArray) {
				if (err) {
					console.log("Error in getCollection: " + err);
				}
				console.log("Found poems data.");
				console.log("Calling private method writeFiveFiles.");
				writeFiveFiles(theArray, baseDir);

				console.log("Sending back the data.");								
				response.send(theArray);
			}); // End find and send back.
			
		});  // End getDatabase
	};  // End downloadPoems

	
	var writeFiveFiles = function(theArray, baseDir) {
		// Write a single .md file to the file system, and for now, hardcode the path.
		// So an issue is that the Sonnets01 folder has to already exist. Otherwise, an error is thrown. How do you create the directory?
		// Research fs commands.
		console.log("Base directory is: " + baseDir);
		var sonnetNum = 1;
		
//		var targetDirectory = baseDir + "Sonnets01/";  // Maybe move the "Sonnet" part up here??
		var dirNum = padNumber(sonnetNum, 2, 0); // 2nd param is number of places.
		var targetDirectory = baseDir + "Sonnets" + dirNum + "/";
		var extension = ".md";
		var outFileString = "";
		var filename = "";
		
		// Synchronously, write it back to the file system as Sources.md.
		// fs.mkdir(path, [mode], callback);
		fs.mkdirSync(targetDirectory);	// Create the directory.

		for(var i = 1; i < 8; i++, sonnetNum++) {
			filename = padNumber(sonnetNum, 2, 0);
			outFileString = targetDirectory + 'Sonnet'+ filename + extension;
			fs.writeFile(outFileString, theArray[i-1].content, 'utf8', function(err, data){ // Test changing from writeFileSync to just writeFile.
		      if (err) throw err;		      
	        }); // End writeFile
	        console.log('Wrote Sonnet' + filename + '.md.');
		} // End loop to write out 5 files
        			
	};  // End writeFiveFiles
		
	// Private helper function called by writeFiveFiles to push in leading zeros in folder and file names.
	// Pass in number, 3, and 0.
	var padNumber = function(numberToPad, width, padValue) {
		padValue = padValue || '0';
		numberToPad = numberToPad + '';
		if (numberToPad.length >= width) {
			return numberToPad;
		} else {
			return new Array(width - numberToPad.length + 1).join(padValue) + numberToPad;
		}
	}; // End padNumber
	
	QueryMongo.prototype.getCollection = function(initResponse, collectionName) {
		console.log("getCollection called");
		console.log("collectionName is " + collectionName);
		response = initResponse;
		
		getDatabase(response, collectionName, function(database, response, collectionName) {
			console.log("In getCollection callback: " + collectionName);
			
			var currentCollection = null;
			
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
				console.log("Found collection item.");
				console.log("Sending back the data.");
				console.log(theArray);
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
				console.log("Insert succeeded");
				response.send({result:'Success'});
			}); // End insert
		});
	};  // End addRecordfromJSONFile
	

    // Removes the currently selected item from the collection by using the value of _id.
    // Not used in final project.
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
				console.log("Item deleted");
			}); 
			
		});
	}; // End removeRecordfromCollection

	// Updates the staging config (TCO) collection using the updateDetails object. updateDetails contains all of the update info for that record, including the ID.
	QueryMongo.prototype.updateTCOCollection = function(updateDetails, initResponse) {
		console.log("QueryMongo.updateCTOCollection called");
		
		response = initResponse;
		
		var collection = collectionObjectTCO; // The collection to be updated.		
		
		// Use the index into the data (options) to determine the value of _id for the record to update.
		var options = JSON.parse(updateDetails.query.options);
		var index = updateDetails.query.index;
		console.log("Pointing to current index:  " + index);
		
		var idString = ""+options[index]._id;  // Ensures the ID is a string.
		console.log("Request object has selected record idString: " + idString);

		// Vet the data in the request object.		
		console.log("Update details:");
		console.log("New pathToPython:  " + updateDetails.query.newPathToPython);
		console.log("New newCopyFrom:  " + updateDetails.query.newCopyFrom);	
		console.log("New newCopyTo:  " + updateDetails.query.newCopyTo);
		console.log("New newFilesToCopy:  " + updateDetails.query.newFilesToCopy);
				
		collection.update({ "_id": mongodb.ObjectID(idString) },
		   { "pathToPython":updateDetails.query.newPathToPython, "copyFrom": updateDetails.query.newCopyFrom, "copyTo": updateDetails.query.newCopyTo, "filesToCopy": updateDetails.query.newFilesToCopy },	
			function(err, data) {
				if (err) {
					throw err;
				}

			console.log("Item updated");
			response.send({result:'Success'});  // Send a result of success for now.	
		}); 
	      
	}; // End updateTCOCollection		

	
	// Updates the publishing config (CTA) collection using the updateDetails object. updateDetails contains all of the update info for that record, including the ID.
	QueryMongo.prototype.updateCTACollection = function(updateDetails, initResponse) {
		console.log("QueryMongo.updateCTACollection called");
		
		response = initResponse;
		
		var collection = collectionObjectCTA; // The collection to be updated.
		
		// Use the index into the data (options) to determine the value of _id for the record to update.
		var options = JSON.parse(updateDetails.query.options);
		var index = updateDetails.query.index;
		console.log("Pointing to current index:  " + index);
		
		var idString = ""+options[index]._id;  // Ensures the ID is a string.
		console.log("Request object has selected record idString: " + idString);

		// Vet the data in the request object.		
		console.log("Update details:");
		console.log("New pathToConfig:  " + updateDetails.query.newPathToConfig);
		console.log("New reallyWrite:  " + updateDetails.query.newReallyWrite);	
		console.log("New bucketName:  " + updateDetails.query.newBucketName);
		console.log("New folderToWalk:  " + updateDetails.query.newFolderToWalk);
		console.log("New s3RootFolder:  " + updateDetails.query.newS3RootFolder);
		console.log("New createFolderToWalkOnS3:  " + updateDetails.query.newCreateFolderToWalkOnS3);	
		console.log("New createIndex:  " + updateDetails.query.newCreateIndex);
		console.log("New filesToIgnore:  " + updateDetails.query.newFilesToIgnore);
						
		collection.update({ "_id": mongodb.ObjectID(idString) },
		   { 
			   "pathToConfig":updateDetails.query.newPathToConfig,
			   "reallyWrite": updateDetails.query.newReallyWrite,
			   "bucketName": updateDetails.query.newBucketName,
			   "folderToWalk": updateDetails.query.newFolderToWalk,			   
			   "s3RootFolder":updateDetails.query.newS3RootFolder,
			   "createFolderToWalkOnS3": updateDetails.query.newCreateFolderToWalkOnS3,
			   "createIndex": updateDetails.query.newCreateIndex,
			   "filesToIgnore": updateDetails.query.newFilesToIgnore
		   },	
			function(err, data) {
				if (err) {
					throw err;
				}

			console.log("Item updated");
			response.send({result:'Success'});  // Send a result of success for now.	
		}); 
	      
	}; // End updateCTACollection		


	return QueryMongo;

})();


exports.QueryMongo = new QueryMongo();
