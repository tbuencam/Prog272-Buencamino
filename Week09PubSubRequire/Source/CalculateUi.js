/**
 * @author Terence Buencamino
 */
/* jshint strict:true */

var PubSub = {};

PubSub.Subscriber = ( function() {'use strict';

		function Subscriber() {
			$.Topic('add').subscribe(functionAdd);
			$.Topic('subtract').subscribe(functionSubtract);	
			$.Topic('multiply').subscribe(functionMultiply);					
		}

		function functionAdd(event) {
			console.log("Called functionAdd");
			console.log(event);
			event.add();
			event.acknowledge("Received operands " + event.num1  + " and " + event.num2  + ", and the SUM (" + event.result + ") from publisher.");
		}

		function functionSubtract(event) {
			console.log("Called functionSubtract");
			console.log(event);
			event.subtract();
			event.acknowledge("Received operands " + event.num1  + " and " + event.num2  + ", and the DIFFERENCE (" + event.result + ") from publisher.");
		}

		function functionMultiply(event) {
			console.log("Called functionMultiply");
			console.log(event);
			event.multiply();
			event.acknowledge("Received operands " + event.num1  + " and " + event.num2  + ", and the PRODUCT (" + event.result + ") from publisher.");
		}

		return Subscriber;

	}());
