/**
 * @author Terence
 */

function myObject() {
	$("#button01").click(foo);
	$("#paragraph01").html("This sentence added by jQuery");
}

function foo() {
	console.log("foo");
    $("#paragraph02").html("This sentence also added by jQuery");

}

$(document).ready(function() {
    myObject();
});