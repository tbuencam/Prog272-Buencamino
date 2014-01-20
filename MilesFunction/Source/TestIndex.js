/**
 * @author Terence
 */

describe("Prog272 Jasmine Test milesConvert Function", function() {
	
	it("expects milesConvert(0) to equal 0", function() {
		var actual = milesConvert(0);
		expect(actual).toBe(0);
	});
	
	it("expects milesConvert(1) to equal 5280", function() {
		var actual = milesConvert(1);
		expect(actual).toBe(5280);
	});
	
	it("expects milesConvert(2) to equal 10560", function() {
		var actual = milesConvert(2);
		expect(actual).toBe(10560);
	});	
	
	it("expects milesConvert(3) to equal 15840", function() {
		var actual = milesConvert(3);
		expect(actual).toBe(15840);
	});
	
	it("expects milesConvert(-1) to equal -5280", function() {
		var actual = milesConvert(-1);
		expect(actual).toBe(-5280);
	});
	
	it("expects milesConvert(1.5) to equal 7920", function() {
		var actual = milesConvert(1.5);
		expect(actual).toBe(7920);
	});
			
});
