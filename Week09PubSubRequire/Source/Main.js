/**
 * @author Terence Buencamino
 */

require.config({
  paths: {
    "jquery": "http://code.jquery.com/jquery-1.11.0.min",
    "tinyPubSub": "TinyPubSub"    
  }
});

require(["jquery","Subscriber","Publisher"], function(j, sub, pub) {
	console.log("Main called.");
	// Need to instatiate the calculate objects here.
	sub.calculate();
	pub.calculateUi();
	// sub.subscriber();
	// pub.publisher();
});
