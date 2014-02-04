/**
 * @author Terence Buencamino
 * jshint strict:true
 */

function InfoManager() {'use strict';
	
	this.getData = function() {
		$('#buttonJson01').click(this.getData01);
		$('#buttonJson02').click(this.getData02);
		$('#buttonJson03').click(this.getData03);
	};

	this.getData01 = function() {'use strict';
		$.getJSON('json/index.json', function(data) {
			  var result = "<p><strong>President " + data[0].id + ": </strong>" + data[0].firstName + " " + data[0].lastName + "</p>";
			  $("#div01").html(result);
		}).success(function() {
			console.log("csc: success. Loaded index.json");
		}).error(function(jqXHR, textStatus, errorThrown) {
			showError(jqXHR, textStatus, errorThrown);
		}).complete(function() {
			console.log("csc: completed call to get index.json");
		});
	};  /* End getData01 */
	
	this.getData02 = function() {'use strict';
		$.getJSON('json/index.json', function(data) {
			  var result = "<p><strong>President " + data[1].id + ": </strong>" + data[1].firstName + " " + data[1].lastName + "</p>";
			  $("#div01").html(result);
		}).success(function() {
			console.log("csc: success. Loaded index.json");
		}).error(function(jqXHR, textStatus, errorThrown) {
			showError(jqXHR, textStatus, errorThrown);
		}).complete(function() {
			console.log("csc: completed call to get index.json");
		});
	};  /* End getData02 */

	this.getData03 = function() {'use strict';
		$.getJSON('json/index.json', function(data) {
			  var result = "<p><strong>President " + data[2].id + ": </strong>" + data[2].firstName + " " + data[2].lastName + "</p>";
			  $("#div01").html(result);
		}).success(function() {
			console.log("csc: success. Loaded index.json");
		}).error(function(jqXHR, textStatus, errorThrown) {
			showError(jqXHR, textStatus, errorThrown);
		}).complete(function() {
			console.log("csc: completed call to get index.json");
		});
	};  /* End getData03 */


	this.getHtml = function() {'use strict';
       $('#button01').click(this.getPara1);
       $('#button02').click(this.getPara2);
       $('#button03').click(this.getPara3);
	};  /* End getHtml */
	
	this.getPara1 = function() {'use strict';
		$('#div01').load("src/Sources.html #paragraph01", function() {
			console.log( "Loaded paragraph 01." );
		});
	};  /* End getPara1 */

	this.getPara2 = function() {'use strict';
		$('#div01').load("src/Sources.html #paragraph02", function() {
			console.log( "Loaded paragraph 02." );
		});
	};  /* End getPara2 */

	this.getPara3 = function() {'use strict';
		$('#div01').load("src/Sources.html #paragraph03", function() {
			console.log( "Loaded paragraph 03." );
		});
	};  /* End getPara3 */

} /* End infoManager */



$(document).ready(function() {
	var infoManager = new InfoManager();
	infoManager.getHtml();
	infoManager.getData();
});