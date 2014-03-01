/**
 * @author Terence Buencamino
 */
 /* jshint strict:true */
 
var request = require('request');

describe("A Mongo Suite", function() { 'use strict';
	
	// When createRecords is called, QueryMongo's createRecordsfromJSONFile function returns "Success."
	it("should insert all the documents", function(done) {
		request("http://localhost:30025/createRecords", function(error, response, body) {
			console.log("Calling createRecords to insert all sonnet records into the collection.");			
			
			// Convert result from a JSON string to a JSON object
			body = JSON.parse(body);

			console.log("Returned in body.result: " + body.result);
			expect(body.result).toEqual('Success');			
			done();
		});
	}); // End Test 1, calling createRecords.

	// When readAll is called, QueryMongo's getCollection function returns the entire array of records in the collection.
	it("should read back all the documents", function(done) {
		request("http://localhost:30025/readAll", function(error, response, body) {
			console.log("Calling readAll to get all sonnet records.");
			
			// Convert result from a JSON string to a JSON object
			body = JSON.parse(body);
			
			//console.log(body);
			console.log("Number of records indicated in body.length: " + body.length);		
			expect(body.length).toEqual(154);  // The database should have 154 records after they are inserted.
			done();
		});
	}); // End Test 2, calling readAll.

	// When addRecord is called, QueryMongo's addRecordfromJSONFile returns the result "Success."
	it("should insert one additional document", function(done) {
		request("http://localhost:30025/addRecord", function(error, response, body) {
			console.log("Calling addRecord to insert an additional sonnet record.");
			
			// Convert result from a JSON string to a JSON object
			body = JSON.parse(body);
			
			console.log("Returned in body.result: " + body.result);
			expect(body.result).toEqual('Success');
			done();
		});
	}); // End Test 3, calling addRecord.

}); 
