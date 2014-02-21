var MongoData = (function() { 'use strict';

	var mongoData = null;

	function MongoData() {		
		$("#readAll").click(queryAll);
		$("#readTwo").click(queryTwo);
		$("#showData").click(showData);
		$("#addRecord").click(addRecord);	// New button.	
	}

	var displayRecord = function(index) {
		$('#firstName').html(mongoData[index].firstName);
		$('#lastName').html(mongoData[index].lastName);
		$('#address').html(mongoData[index].address);
		$('#city').html(mongoData[index].city);
		$('#state').html(mongoData[index].state);
		$('#zip').html(mongoData[index].zip);
	};

	var showData = function() {
		var index = $("#userIndex").val();
		displayRecord(index);
	};

	var queryAll = function() {
		$.getJSON('/readAll', function(data) {
			mongoData = data;
			console.log(data);
			displayRecord(0);
			$("#mongoData").empty();
			for (var i = 0; i < data.length; i++) {
				$("#mongoData").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};

	var queryTwo = function() {
		$.getJSON('/readTwo', function(data) {
			mongoData = data;
			console.log(data);
			displayRecord(0);
			$("#mongoData").empty();
			for (var i = 0; i < data.length; i++) {
				$("#mongoData").append('<li>' + JSON.stringify(data[i]) + '</li>');
			}
		});
	};
	
	var addRecord = function() {			
			$.getJSON('/addRecord', function() {  // May remove data. Not doing anything with it.	
			console.log('In getJSON /addRecord callback in index.js.');
			$("#addMessage").empty();  // Clear out the message area for add.
			$("#addMessage").html('<span class="new">The record was added to the database. Click <strong>Read All</strong> to see the new record.</span>');
		}); // End .getJSON		
	};  // End addRecord

	return MongoData;
})();

$(document).ready(function() { 'use strict';
	var o = new MongoData();

});
