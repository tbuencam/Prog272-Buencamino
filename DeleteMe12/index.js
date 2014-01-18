/**
 * @author Terence
 */
/* jshint strict:true */


var foo = {
	firstName : 'Terence',
	lastName : 'Buencamino',
	func : function() {'use strict';
		console.log('func called: ' + this.firstName);
	}
};

foo.func(); 


