/**
 * @author Terence Buencamino
 */
/* jshint strict:true */

// Publisher
PubSub.Publisher = (function() { 'use strict';
	
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

	function Publisher() {
		$("#addButton").click(addMethod);
		$("#subtractButton").click(subtractMethod);
		$("#multiplyButton").click(multiplyMethod);		
	}

	// Gathers the user input then publishes a request for an object that can do the addition.
	var addMethod = function() {
		Calculator.num1 = parseInt($("#operand1").val());	
		Calculator.num2 = parseInt($("#operand2").val());
		$.Topic('add').publish(Calculator);
	}; // End addMethod
	
	// Gathers the user input then publishes a request for an object that can do the subtraction.
	var subtractMethod = function() {
		Calculator.num1 = parseInt($("#operand1").val());	
		Calculator.num2 = parseInt($("#operand2").val());
		$.Topic('subtract').publish(Calculator);
	}; // End subtractMethod

	// Gathers the user input then publishes a request for an object that can do the multiplication.
	var multiplyMethod = function() {
		Calculator.num1 = parseInt($("#operand1").val());	
		Calculator.num2 = parseInt($("#operand2").val());
		$.Topic('multiply').publish(Calculator);
	}; // End multiplyMethod
	
	return Publisher;

}());

$(document).ready(function() {
	new PubSub.Subscriber();
	new PubSub.Publisher();
});
