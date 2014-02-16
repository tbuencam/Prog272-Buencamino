var express = require('express');
var app = express();
var fs = require('fs');
// Adding my modules:
var distanceCalculator = require('./Library/DistanceCalculator');
var circumferenceCalculator = require('./Library/CircumferenceCalculator');

app.use(express.bodyParser());

var port = process.env.PORT || 30025;

// Uses get: Returns the feet in a mile (a private var value).
app.get('/getFeetInMile', function(request, response) {
	console.log('getFeetInMile called');
	response.send({ "result": distanceCalculator.Converter.getFeetInMile() });
});

// Uses get: Returns the feet equivalent of the specified miles.
app.get('/milesToFeet', function(request, response) {
	console.log('milesToFeet called');
	console.log(request.query);	
	var miles = parseInt(request.query.miles);
	var result = distanceCalculator.Converter.milesToFeet(miles);
	response.send({ "result": result });
});

// Uses post: Returns the circumference for the specified radius.
app.post('/calcCircumference', function(request, response) {
	console.log('calcCircumference called');
	console.log(request.body);
	var radius = parseInt(request.body.radius);
	var result = circumferenceCalculator.Calculator.calcCircumference(radius);
	response.send({ "result": result });
});

app.get('/', function(request, response) {
	var html = fs.readFileSync(__dirname + '/Public/index.html');
	response.writeHeader(200, {"Content-Type": "text/html"});   
	response.write(html);
	response.end();
});

app.use("/", express.static(__dirname + '/Public'));
app.listen(port);
console.log('Listening on port :' + port);
