This project is a web and a Cordova app that allows a user to view Shakespearean sonnets stored in a Mongo database.
The user can also delete sonnets, one at a time, and add a hardcoded 155th sonnet, read from a file on the server.
A list of keywords is provided, from which the user can select to get a subset of sonnets to view.

NOTES:

Usage -
* After adding, removing , or filtering operations, the user must refresh the list of sonnets from which to select by clicking the 
"Bring'st Forth Mine Lovely Sonnets" button. (This is a known limitation to improve upon the next version.)
* Clicking "Add'st thou Thine Own Fair Sonnet" adds the extra (155th) sonnet, read from Data.json.
* Clicking "Remov'st Thou This Wretched Sonnet" deletes the currently selected sonnet.

Behind the Scenes -
* The css has been modified a bit for the Cordova version so that the elements display nicely on an Android tablet.
* For extra credit: The code reads the database URL, collection name, data input files from config.json.
* Server testing - Run Week07_Midterm\MidtermWeb_Buencamino\Tests\SonnetServerSpec.js.
* Client testing - Run Week07_Midterm\MidtermWeb_Buencamino\ClientTest.js and point a browser to localhost:3005.
  (SonnetClientTests.html has code for displaying the test results.)