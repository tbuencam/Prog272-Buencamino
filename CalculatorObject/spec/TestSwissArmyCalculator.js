/**
 * @author Terence
 */


describe("Prog272 Jasmine Test calculator Object Members", function() {

    /* 	Test property value of milesPerKM : 0.6214 */
	it("expects calculator.milesPerKM to equal 0.6214", function() {
		var actual = calculator.milesPerKM;
		expect(actual).toBe(0.6214);
	});

	
   /* Test Fahrenheit-To-Celsius Conversion: */
	it("expects calculator.fahrenheitToCelsiusConvert(32) to equal 0", function() {
		var actual = calculator.fahrenheitToCelsiusConvert(32);
		expect(actual).toBe(0);
	});
	it("expects calculator.fahrenheitToCelsiusConvert(98.6) to equal 37", function() {
		var actual = calculator.fahrenheitToCelsiusConvert(98.6);
		expect(Math.floor(actual)).toBe(37);
	});
	it("expects calculator.fahrenheitToCelsiusConvert(0) to equal -17", function() {
		var actual = calculator.fahrenheitToCelsiusConvert(0);
		expect(Math.ceil(actual)).toBe(-17);
	});
	

    /* Test Miles-To-KM Conversion: */
	it("expects calculator.milesToKMConvert(0.6214) to equal 1", function() {
		var actual = calculator.milesToKMConvert(0.6214);
		expect(actual).toBe(1);
	});
	it("expects calculator.milesToKMConvert(6.214) to be close to 10", function() {
		var actual = calculator.milesToKMConvert(6.214);
		expect(actual).toBeCloseTo(10);
	});	
	it("expects calculator.milesToKMConvert(62.14) to be close to 100", function() {
		var actual = calculator.milesToKMConvert(62.14);
		expect(actual).toBeCloseTo(100);
	});
	
	
   /* Test Square Root Calculation: */
 	it("expects calculator.squareRoot(0) to equal 0", function() {
		var actual = calculator.squareRoot(0);
		expect(actual).toBe(0);
	});
	it("expects calculator.squareRoot(81) to equal 9", function() {
		var actual = calculator.squareRoot(81);
		expect(actual).toBe(9);
	});
	it("expects calculator.squareRoot(144) to equal 12", function() {
		var actual = calculator.squareRoot(144);
		expect(actual).toBe(12);
	});
	/*
	it("expects calculator.squareRoot(-9) to equal NaN", function() {
		var actual = calculator.squareRoot(-9);
		expect(actual).toBe(NaN);
	});*/	

}); 

