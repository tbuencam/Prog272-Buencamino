/**
 * @author Terence Buencamino
 */
 /* jshint strict:true */

var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

var url01 = 'mongodb://127.0.0.1:27017/test';
var url02 = 'mongodb://192.168.2.19:27017/test';

  MongoClient.connect(url01, function(err, db) {'use strict';
    if(err) throw err;

    // Declare the collection and set it to 'test_data':
    var collection = db.collection('test_data');
    // First, wipe out the existing collection.
    collection.remove(function(err) {'use strict';
		if (err) {
			throw err;
		}
	});
    
    // Then, recreate it and populate with 250 records:
    collection = db.collection('test_data');
    for (var suffix = 10000; suffix <=10250; suffix++) {
    collection.insert({"firstName": "Michael" + suffix, "lastName": "Feinstein" + suffix, "address": suffix + " Landerholm Circle", "city": "Bellevue", "state": "WA", "zip": "98007"}, function(err, docs) {
      
    })};   /* The second curly brace here closes the loop to auto-create records. */    

    
    // Show the results of creating the collection by writing the records and count to the console.    
    // Locate all the entries using find.
    collection.find().toArray(function(err, results) {'use strict';
      console.dir(results); // DBUG: Displays the array of records created to the console.
      // Close the db.
      db.close();
    });
      
    // Count and display the number of records.
      collection.count(function(err, count) {'use strict';
      console.log(format("count = %s", count));
    });
     
  })
