describe("Elvenware Jasmine One Suite", function() {
	
  it("expects to get nine", function() {
    expect(numberGetter.getNine()).toBe(9);
  });
  
  it("expects to get eight", function() {
    expect(numberGetter.getEight()).toBe(8);
  });
});