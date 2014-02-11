/**
 * @author Terence Buencamino
 */
 /* jshint strict:true */


$(document).ready(function() {

	$.getJSON('/read', function(data) {'use strict';
		// console.log(data);
			
		// Show the first record initially:
		$("#recordNum").val(0);   // In the input field.
		$("#name").html(data[0].firstName + " " + data[0].lastName);
		$("#address").html(data[0].address);
		$("#cityStateZip").html(data[0].city + ", " + data[0].state + " " + data[0].zip);

        // When the button is clicked, read the value from the input field and process it.
        // Here the data array is passed into the button click method.
        $("#showButton").click({d: data},displayRecord);
		
	});  // End $.getJSON
	
	// When the button is clicked, the requested data is displayed.
	function displayRecord(myData) {'use strict';
		var recordNum = $("#recordNum").val();
        
        var d = myData.data.d;
        
        // Show the requested record:         
		$("#name").html(d[recordNum].firstName + " " + d[recordNum].lastName);
		$("#address").html(d[recordNum].address);
		$("#cityStateZip").html(d[recordNum].city + ", " + d[recordNum].state + " " + d[recordNum].zip);	 
	}
	
});
