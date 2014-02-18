/**
 * @author Terence Buencamino
 */
/* jshint strict:true */

var Run = ( function() { 'use strict';

		// Constructor sets the button click handlers.
		function Run() { 'use strict';
			$("#readInMarkdown").click(readInMarkdown);
			$("#writeOutMarkdown").click(writeMarkdownToHTML);
			$("input[name=mainGroup]:radio").click(displayCheckboxSelection);
		}
				
		// The readInMarkdown button handler.
		var readInMarkdown = function() { 'use strict';
			var readInMarkdownResult = $('#readInMarkdownResult');					
			$.get('/readMDIntoMongo', function(data) { 'use strict';
				readInMarkdownResult.html("Read markdown file into Mongo.");
			});				
		}; // End readInMarkdown

					
		// The writeMarkdownToHTML button handler.
		var writeMarkdownToHTML = function() { 'use strict';
			var writeMarkdownToHTMLResult = $('#writeMarkdownToHTMLResult');					
			$.get('/writeMongoToHTML', function(data) { 'use strict';
				writeMarkdownToHTMLResult.html("Read markdown from Mongo and converted it to HTML.");
			});					
		}; // End readInMarkdown

	
		// The radio button selection handler.
		var displayCheckboxSelection = function() {	'use strict';
			if ($("#washington").is(':checked')) {		
				$.get("Sources.html", function(data) { 'use strict';
					var content = $("#george-washington", '<div>' + data + '</div>')
					.nextUntil('#john-adams')  // Until Adams
					.addBack();
					$('#showData').html(content);
				});	
			} // End if Washington
			
			if ($("#adams").is(':checked')) {		
				$.get("Sources.html", function(data) { 'use strict';	
					var content = $("#john-adams", '<div>' + data + '</div>')
					.nextUntil('#thomas-jefferson')  // Until Jefferson
					.addBack();
					$('#showData').html(content);
				});	
			} // End if Adams
			
			if ($("#jefferson").is(':checked')) {		
				$.get("Sources.html", function(data) { 'use strict';
					var content = $("#thomas-jefferson", '<div>' + data + '</div>')
					.nextUntil('#dummy-end')  // Until the end (something that doesn't exist).
					.addBack();
					$('#showData').html(content);
				});	
			} // End if Jefferson
			
		} // End displayCheckboxSelection
		
		
		// Return the constructor
		return Run;
	}());

$(document).ready(function() {
	new Run();
}); 
