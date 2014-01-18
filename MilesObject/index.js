/**
 * @author Terence
 */
/* jshint strict:true */

/* mileConvert object definition and instantiation: */

var milesConvert = {
	miles : 3,
	feetPerMile : 5280,
	milesToFeet : function() {'use strict';
		return this.miles * this.feetPerMile;
	} /* End milesToFeet method implementation. */
};
/* End milesConvert object */


/* milesToFeet method invocation, with output to console log. */
console.log('3 miles in feet: ' + milesConvert.milesToFeet());
