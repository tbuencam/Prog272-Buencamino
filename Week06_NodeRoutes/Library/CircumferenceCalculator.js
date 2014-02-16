// Object with a public method that calculates the circumference of a circle.
var Calculator = (function() {
		
	// Constructor.
	function Calculator() {
		console.log("Calculator.Constructor called.");
	}

	// Method: Calculates the circumference for the radius specified.
	Calculator.prototype.calcCircumference = function(radius) {
		var circumference = 2 * radius * Math.PI;
	    console.log("Returning " + circumference + " for radius " + radius);
		return circumference;
	};		

    // Return the constructor.
	return Calculator;

}());

exports.Calculator = new Calculator();
