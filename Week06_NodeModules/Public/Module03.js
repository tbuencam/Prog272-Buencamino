// Object with a public method that squares an integer.
var Squarer = (function() {

	// Constructor
	function Squarer() {
		console.log("Squarer.Constructor called.");
	}

	// Method: Square the specified integer.
	Squarer.prototype.square = function(num) {
		var result = num * num;
		console.log("Squaring: " + num + " squared = " + result);
	};		

    // Return the constructor.
	return Squarer;

}());

exports.Squarer = new Squarer();
