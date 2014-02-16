// Link in the required modules.
var mod01 = require('./Module01');
var mod02 = require('./Library/Module02');
var mod03 = require('./Public/Module03');

// Add numbers.
mod01.Calculator.add(2,3);
mod01.Calculator.multiply(10,5);
mod01.Calculator.subtract(7,4);

// Convert feet to miles.
mod02.Converter.feetToMiles(52800);

// Square the number.
mod03.Squarer.square(12);
