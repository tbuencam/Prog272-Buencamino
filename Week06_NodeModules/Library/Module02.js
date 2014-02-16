// Object with a public method that converts feet to miles.
var Converter = (function() {

	// Private Data.
	var ratio = 5280;
		
	// Constructor.
	function Converter() {
		console.log("Converter.Constructor called.");
	}

	// Method: Convert specified feet to miles.
	Converter.prototype.feetToMiles = function(feet) {
		var miles = feet / ratio;
		console.log("Converting: " + feet + " feet = " + miles + " miles");
	};		

    // Return the constructor.
	return Converter;

}());

exports.Converter = new Converter();
