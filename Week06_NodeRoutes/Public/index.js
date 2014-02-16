var RouteMaster = ( function() {

		// Constructor.
		function RouteMaster() {
			// Setting the button click handlers.
			$("#getFeetInMile").click(getFeetInMile);
			$("#convertMilesToFeet").click(milesToFeet);
			$("#calcCircumference").click(postCircumference);
		}
		
		// The getFeetInMile button handler.
		var getFeetInMile = function() {
			var feetInMileResult = $('#getFeetInMileResult');					
			$.get('/getFeetInMile', function(data) {
				feetInMileResult.html("Seriously? There are <span class='result'>" + data.result +"</span> feet in a mile.");
			});
					
		};

		// The convertMilesToFeet button handler. (Uses GET.)
		var milesToFeet = function() {
			var miles = $("#miles").val();

			$.ajax({
				url : "/milesToFeet",
				type : "GET",
				data : {
					"miles" : miles
				},
				dataType : "json",
				success : function(data) {					
					$("#milesToFeetResult").html(miles + " miles is <span class='result'>" + data.result + "</span> feet.");
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		};

		// The calcCircumference button handler. (Uses POST.)
		var postCircumference = function() {
			var radius = $("#radius").val();

			$.ajax({
				url : "/calcCircumference",
				type : "POST",
				data : {
					"radius" : radius
				},
				dataType : "json",
				success : function(data) {					
					$("#circumferenceResult").html("The circumference is <span class='result'>" + data.result + "</span>.");
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		};

		// Return constructor
		return RouteMaster;
	}());

$(document).ready(function() {
	new RouteMaster();
}); 
