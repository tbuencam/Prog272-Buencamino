/**
 * @author Terence Buencamino
 */
/* jshint strict:true */


// Publisher
define(['jquery', 'tinyPubSub'], function() {'use strict';
	
	// Testing making this object global to the Publisher object.
	var Calculator = {
	message : 'Calculator called.',
	num1:0,
	num2:0,
	result:0,	
	add:function() {
		this.result = this.num1 + this.num2;
		$("#result").html(this.num1 + ' + ' + this.num2 + ' = ' + this.result);
	}, // End add function.
	subtract:function() {
		this.result = this.num1 - this.num2;
		$("#result").html(this.num1 + ' - ' + this.num2 + ' = ' + this.result);
	}, // End subtract function.
	multiply:function() {
		this.result = this.num1 * this.num2;
		$("#result").html(this.num1 + ' * ' + this.num2 + ' = ' + this.result);
	}, // End multiply function.
	acknowledge:function(value) {
		$("#response").html(value);
		} // End acknowledge function.			
	}; // End Calculator object.	

	// Constructor
	function calculateUi() {
		$("#addButton").click(addMethod);
		$("#subtractButton").click(subtractMethod);
		$("#multiplyButton").click(multiplyMethod);		
	}

	// Gathers the user input then publishes a request for an object that can do the addition.
	var addMethod = function() {
		console.log("In addMethod of publisher.");
		Calculator.num1 = parseInt($("#operand1").val());	
		Calculator.num2 = parseInt($("#operand2").val());
		console.log("Publishing Calculator for add method.");
		$.publish('add',Calculator);	
	}; // End addMethod
	
	// Gathers the user input then publishes a request for an object that can do the subtraction.
	var subtractMethod = function() {
		Calculator.num1 = parseInt($("#operand1").val());	
		Calculator.num2 = parseInt($("#operand2").val());
		$.publish('subtract',Calculator);
	}; // End subtractMethod

	// Gathers the user input then publishes a request for an object that can do the multiplication.
	var multiplyMethod = function() {
		Calculator.num1 = parseInt($("#operand1").val());	
		Calculator.num2 = parseInt($("#operand2").val());
		$.publish('multiply',Calculator);
	}; // End multiplyMethod

	return {calculateUi: calculateUi};

});
