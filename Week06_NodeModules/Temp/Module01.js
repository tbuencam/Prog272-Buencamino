// Object with public methods that add, multiply and subtract two whole numbers.
var Calculator = (function() {
	
	// Constructor
	function Calculator() {
		console.log("Calculator.Constructor called.");
	}

	// Add method.
	Calculator.prototype.add = function(operandA,operandB) {
		var sum = operandA + operandB;
		console.log("Adding: " + operandA + " + " + operandB + " = " + sum);
	};

	// Multiply method.
	Calculator.prototype.multiply = function(operandA,operandB) {
		var product = operandA * operandB;
		console.log("Multiplying: " + operandA + " * " + operandB + " = " + product);
	};
		
	// Subtract method.
	Calculator.prototype.subtract = function(operandA,operandB) {
		var difference = operandA - operandB;
		console.log("Subtracting: " + operandA + " - " + operandB + " = " + difference);
	};

    // Return the constructor.
	return Calculator;

}());

exports.Calculator = new Calculator();
