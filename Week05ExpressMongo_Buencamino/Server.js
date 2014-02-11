/**
 * @author Terence Buencamino
 */
 /* jshint strict:true */

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');

var QueryMongo = (function() {'use strict';

	var url01 = 'mongodb://127.0.0.1:27017/test';
	var url02 = 'mongodb://192.168.2.19:27017/test';
	var url03 = 'mongodb://192.168.56.101:27017/test';

	function QueryMongo() {

	}

	QueryMongo.prototype.getData = function(result) {'use strict';
		console.log('Called getData');
		
		// Open the test database that comes with MongoDb
		MongoClient.connect(url01, function(err, database) {
			if (err) {
				throw err;
			}
			console.log('IngetDataCallback');
			getCollection(database, result);
		});

	}
	
	var getCollection = function(database, response) {'use strict';
	
		// Declare the collection and set it to 'test_data':
		var collection = database.collection('test_data');

		// Count documents in the collection.
		collection.count(function(err, count) {
			console.log(format("count = %s", count));
		});

		// Send the collection to the client.
		collection.find().toArray(function(err, theArray) {'use strict';
		    console.dir(theArray);  // DBUG: Displays the array of records retrieved to the console.
			database.close();
			response.send(theArray);
		});

	};

	
	return QueryMongo;

})();

// Read the collection.
app.get('/read', function(request, response) {'use strict';
	var q = new QueryMongo();
	var data = q.getData(response);	
});

// Default.
app.get('/', function(request, result){'use strict';
  	var html = fs.readFileSync(__dirname + '/Public/index.html');
	result.writeHeader(200, {"Content-Type": "text/html"});   
	result.write(html);
	result.end();
});

app.use("/", express.static(__dirname + '/Public'));
app.listen(30025);
console.log('Listening on port 30025');
