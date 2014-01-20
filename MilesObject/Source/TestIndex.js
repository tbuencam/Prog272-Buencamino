/**
 * @author Terence
 */


describe("Prog272 Jasmine Test milesConvert Object Members", function() {

	it("expects milesConvert.miles to equal 3", function() {
		var actual = milesConvert.miles;
		expect(actual).toBe(3);
	});

	it("expects milesConvert.feetPerMile to equal 5280", function() {
		var actual = milesConvert.feetPerMile;
		expect(actual).toBe(5280);
	});

	it("expects milesConvert.milesToFeet() to equal 15840", function() {
		var actual = milesConvert.milesToFeet();
		expect(actual).toBe(15840);
	});

}); 

