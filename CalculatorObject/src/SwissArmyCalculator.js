/**
 * @author Terence
 */
/* jshint strict:true */

/* calculator object definition and instantiation: */

var calculator = {
	milesPerKM : 0.6214,
	/* (°F - 32) x 5/9 */
	fahrenheitToCelsiusConvert : function(temp) {'use strict';	
		return (temp - 32) * 5 / 9;
	}, /* End fahrenheitToCelsiusConvert method implementation. */
	
	milesToKMConvert : function(mi) {'use strict';
		return mi / this.milesPerKM;
	}, /* End milesToKMConvert method implementation. */
	
	squareRoot : function(num) {'use strict';
		return Math.sqrt(num);
	} /* End squareRoot method implementation. */	
};
/* End calculator object */


/* Remove this code for clean-up. */
/* Method invocation, with output to console log. */
/* fahrenheitToCelsiusConvert method: */
console.log('98.6 degrees Fahrenheit in Celsius: ' + calculator.fahrenheitToCelsiusConvert(98.6));
/* milesToKMConvert method: */
console.log('37 miles in kilometers: ' + calculator.milesToKMConvert(37));
/* squareRoot method invocation: */
console.log('Square root of 81: ' + calculator.squareRoot(81));

	





