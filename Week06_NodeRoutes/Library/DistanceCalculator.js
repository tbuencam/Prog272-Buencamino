// Object with a public method that converts feet to miles.
var Converter = (function() {

	// Private Data.
	var feetInMile = 5280;
		
	// Constructor.
	function Converter() {
		console.log("Converter.Constructor called.");
	}

	// Method: Return the number of feet in a mile.
	Converter.prototype.getFeetInMile = function() {		
		console.log("Returning feet in mile: " + feetInMile);
		return feetInMile;
	};	

	// Method: Convert specified miles to feet.
	Converter.prototype.milesToFeet = function(miles) {
		var feet = miles * feetInMile;
	    console.log("Returning: " + miles + " miles = " + feet + " feet");
		return feet;
	};		

    // Return the constructor.
	return Converter;

}());

exports.Converter = new Converter();
