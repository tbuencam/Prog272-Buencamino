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