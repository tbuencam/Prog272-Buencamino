 /**
 * @author Terence Buencamino
 */
 /* jshint strict:true */

var MongoData = (function() { 'use strict';

	var mongoData = null;
	var currPoemIndex = 0;  // Tracks the index of the poem currently displayed.
	var currPoemId = null;  // Track the ID of the poem currently selected (for deletions).

	function MongoData() {	
		$("#createRecords").click(createRecords);	
		//$("#createRecords").style.cursor = "pointer";  This doesn't seem to work here. It just shows all the other buttons. (The 'hide' does not execute.)
		$("#readAll").click(queryAll);		
		$("#keywordList").click(findMatches);   // Dropdown selection so search on keyword.
		$("#sonnetList").click(getSelection);	// Dropdown selection for sonnet to view.
		$("#addRecord").click(addRecord);	
		$("#deleteRecord").click(deleteRecord);	
		// Hide the applicable sections initially so user cannot see those options before collection is populated.
		$("#readAll").hide();
		$("#selectSonnet").hide();
		$("#addRecord").hide();
		$("#deleteRecord").hide();
	}

	var displayRecord = function(index) {
		$(".dataDisplay").css("background-image","none");  // Clear out the message area for add.
		$(".dataDisplay").css("border", "solid gray 2px"); // Changes the border properties.
		$(".dataDisplay").css("width", "350px");
		$(".dataDisplay").css("height", "500px");
	
		$('#title').html(mongoData[index].title);
		$('#content').html(mongoData[index].content);		
	};

    // Searches for sonnets that have the selected keyword and loads them into the sonnet List.
    // Note: There will always be a match because we are controlling the list of keywords. Only time there will be no match is if all the
	// matching records for that keyword were manually deleted first, an unlikely scenario.
	var findMatches = function() {		

		$("#sonnetList").empty();  // Zero out the sonnet list and start fresh.
		
		// Read the selected keyword from the keywordList dropdown.       
        var keywordlist=document.getElementById("keywordList");
        var keywordSelected=keywordlist.options[keywordlist.selectedIndex].text;
        
        console.log("Selected keyword: " + keywordSelected);
		// Loop through each record in mongoData to find the selected keyword.
		for (var i = 0; i < mongoData.length; i++) {
			var keywords = mongoData[i].keywords;
			
			/* If array of keywords includes this keyword, add this item to the list. */
			if(mongoData[i].keywords.indexOf(keywordSelected) !== -1) {
				console.log("Found match for " + keywordSelected + " in " + mongoData[i].title);
				// Add this to the select list!!
				$("#sonnetList").append('<option>' + mongoData[i].title + '</option>');
			} // End if match found in this record's keyword list.				
		}  // End for all records in mongoData		
	}; // End findMatches

	
	// Read the item selected and display it in the right pane.
	var getSelection = function() {
        var sonnetlist=document.getElementById("sonnetList");
        var sonnetSelected=sonnetlist.options[sonnetlist.selectedIndex].text;
        
        console.log("Selected sonnet: " + sonnetSelected);       
		// Determine the index for the to call displayRecord, and the value of _id if removing this record.
		for (var i = 0; i < mongoData.length; i++) {
			if(mongoData[i].title === sonnetSelected) {
				currPoemIndex = i;  // Capture the index of the selected poem for display.
				currPoemId = mongoData[i]._id;  // Capture the _id of the selected poem (for a deletion).
				break;
			}
		}
		// Display the selected poem.
		displayRecord(currPoemIndex);
	}; // End getSelection
	

    //  Read all the data from the collection and populate the list that allows the user to select a sonnet.  
	var queryAll = function() {
		$.getJSON('/readAll', function(data) {
			mongoData = data;
			console.log(data);
			// First, zero out the select list and start fresh because there might have been a previous call to findMatches to fill the list only by keyword match.
			$("#sonnetList").empty();
			
			// Loop to add each of the titles to the selection list named 'sonnetList' so the user can select.
			for (var i = 0; i < data.length; i++) {
				$("#sonnetList").append('<option>' + mongoData[i].title + '</option>');
			}
			
			// Expand the dimensions further and show applicable new sections:			
			$(".buttons").css("width","400px");
			$(".buttons").css("height","250px");
			$("#selectSonnet").show();
			$("#deleteRecord").show();	// Button.			
		});
	}; // End queryAll
	
	// Creates the entire Poems collection from Shakespeare.json.
	var createRecords = function() {			
			$.getJSON('/createRecords', function() {	
			console.log('In getJSON /createRecords callback in index.js.');
			// Remove (hide) the create button after it is used once.
			$("#createRecords").hide();
			// Expand the button area and show the new options:
			$(".buttons").css("height","100px");
			$("#readAll").show();					
			$("#addRecord").show();
		}); // End .getJSON		
	};  // End createRecords	
	
	var addRecord = function() {			
			$.getJSON('/addRecord', function() {	
			console.log('In getJSON /addRecord callback in index.js.');
		}); // End .getJSON		
	};  // End addRecord
	
	
	var deleteRecord = function() {	
		console.log("/deleteRecord in index.js called.");
		var request = {};
		request.idRequested = currPoemId;  // Set currPoemId as the poem to delete.
				
		$.getJSON('/deleteRecord', request, function(data) {  // Passing in request with the poem ID parameter.
			console.log('In getJSON /deleteRecord callback in index.js.');
			console.log(data[0]);	// Show what's in data.		
							
			// Refresh the list of available Sonnets by calling queryAll:
			// $("#readAll").click();  // Force clicking of the readAll button. This does not work.
			// queryAll();				
		}); // End .getJSON
	
	};  // End deleteRecord	
	

	return MongoData;
})();

$(document).ready(function() { 'use strict';
	var o = new MongoData();

});
