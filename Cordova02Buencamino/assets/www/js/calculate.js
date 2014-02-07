/**
 * @author Terence
 */

( function() {

		/* Manipulate the HTML */
		var button = document.getElementById("toCelsiusButton");
		button.addEventListener("click", convertTemp);
		var button = document.getElementById("toKMButton");
		button.addEventListener("click", convertMiles);
		var button = document.getElementById("sqRooterButton");
		button.addEventListener("click", sqRootify);


		function convertTemp() {
			var temperature = document.getElementById("temperature").value;
			var tempVal = parseInt(temperature);
			var celsiusResult = calculator.fahrenheitToCelsiusConvert(tempVal);
			document.getElementById("tempResult").innerHTML = celsiusResult + " &deg;C";
		}

		function convertMiles() {
			var miles = document.getElementById("miles").value;
			var tempVal = parseInt(miles);
			var kmResult = calculator.milesToKMConvert(tempVal);
			document.getElementById("kilometerResult").innerHTML = kmResult + " KM";
		}
		
		function sqRootify() {
			var number = document.getElementById("number").value;
			var tempVal = parseInt(number);
			var sqRootResult = calculator.squareRoot(tempVal);
			document.getElementById("sqRootResult").innerHTML = sqRootResult;
		}


	}()); 
