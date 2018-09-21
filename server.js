// Dependencies

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Express Configuration
var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Required Routes
require("./app/routing/api-routes")(app);
require("./app/routing/html-routes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});