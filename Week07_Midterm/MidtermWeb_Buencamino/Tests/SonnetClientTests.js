/**
 * @author Terence Buencamino
 */
 /* jshint strict:true */

describe("Async file", function() {'use strict';
	
	// Get a handle to a MongoData object.
	var clientTester = null;
	
	beforeEach(function() {
		clientTester = new MongoData();
	});
	
	// Test 1 (using a spy): Test that readAll gets called.
	it("Tests that readAll gets called", function() {
		var data = { data: 3 };
		spyOn($, "getJSON").and.returnValue({success: function(c){c(data);}});
		clientTester.readAll("", null);
		expect($.getJSON).toHaveBeenCalled();		
	}); // End test readAll
	
	// Test 2 (using a spy): Test that deleteRecord gets called.
	it("Tests that deleteRecord gets called", function() {
		// get is stubbed and never really called
		spyOn($, "getJSON").and.returnValue({success: function(c){c(data);}});
		clientTester.deleteRecord("", null);
		expect($.getJSON).toHaveBeenCalled();		
	}); // End test deleteRecord	

	it("Integration test makes a real AJAX request", function(done) {
		clientTester.readAll("../Placeholder.html", function(responseText) {		
			expect(responseText[0].author).toBe("William Shakespeare");
			done();
		});
	}); // End integration test.
	
});
