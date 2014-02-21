/**
 * @author Terence Buencamino
 */

var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');  // Need Express to read from the SON file.


var QueryMongo = (function() {'use strict';

	var response = null;
	var database = null;
	var url = null;
	var targetCollection = 'test_insert';

	
	function QueryMongo() {
		var urls = ['mongodb://127.0.0.1:27017/test',
			'mongodb://192.168.2.19:27017/test',
			'mongodb://192.168.2.34:27017/test',
			'mongodb://192.168.56.101:27017/test'];

		url = urls[0]; // Changed to 0 from 3 to access local Mongo db.
	}

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
	};

	QueryMongo.prototype.getCollection = function(initResponse) {
		console.log("getCollection called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(targetCollection);

			// Send the collection to the client.
			collection.find().toArray(function(err, theArray) {
				console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};  // End getCollection
	
	QueryMongo.prototype.getCollectionCount = function(initResponse, count) {
		console.log("getCollection called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(targetCollection);

			// Send the collection to the client.
			collection.find().limit(count).toArray(function(err, theArray) {
				console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};  // End getCollectionCount
	
	// addRecordfromJSONFile
	QueryMongo.prototype.addRecordfromJSONFile = function(initResponse, count) {
		console.log("Called addRecordfromJSONFile in QueryMongo");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection(targetCollection);
			
			var fileContent = fs.readFileSync('Data.json', 'utf8');  // Declare the JSON input file to read.
			var newRecord = JSON.parse(fileContent);
			
			collection.insert(newRecord, function(err) {		
				if (err) {
				throw err;
			    }	
				database.close();
				console.log("Insert succeeded");
				response.send({result:'Success'});   // For testing
			});	 // End insert
		    		
		});
	};  // End addRecordfromJSONFile
	

	return QueryMongo;

})();


exports.QueryMongo = new QueryMongo();
