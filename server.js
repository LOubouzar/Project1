// Dependencies
var path = require("path");
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

//Express Configuration
var express = require("express");
var app = express();

//static media serve
app.use(express.static("app/public"));

// // API post request
// // var homeData = require("./app/public/home.html");

// // module.exports = function(app) {

// app.get("/api/button2", function(req, res) {
//     // res.json(homeData);
// });

// // };

//Clarifai Config
const Clarifai = require("clarifai");
require("dotenv").config();
var apiKey = process.env.apiKey
var clarifai = new Clarifai.App({ apiKey: apiKey });

// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());


//Etsy Scraper
function scraper(color, res) {
    var results = [];
    request("https://www.etsy.com/search/art-and-collectibles?q=" + color + "&explicit=1", 
        function (err, res2, body) {
            console.log("Etsy Scraper Variable: " + color);
            if (err) console.error(err);
            var $ = cheerio.load(body);

            var resultsURL = [];
            var resultsPrice = [];
            var resultsName = [];
            var resultsImage = [];


            $(".currency-value").each(function (i, e) {
                var price = $(e).text();
                resultsPrice.push(price);
            });

            $("p.text-body").each(function (i, e) {
                var name = $(e).text();
                resultsName.push(name);
            });

            $(".width-full.display-block.position-absolute").each(function (i, e) {
                var image = $(e).attr();
                resultsImage.push(image);
            });

            $(".display-inline-block.listing-link").each(function (i, e) {
                var url = $(e).attr();
                resultsURL.push(url);
            });

            results.push({
                resultsPrice,
                resultsImage,
                resultsName,
                resultsURL,
            });

            console.log(results);
            //send the response to the front end
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(results));
            return results;
    });
};

var PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

app.get("/", function (req, res) {
    console.log("Get request check")
    res.sendFile(path.join(__dirname, "/./app/public/home.html"));
});

//API to analyze
app.get("/analyze", function (req, res) {
    console.log("calling analyze");
    //clarifai API 
    var colorName = "";
    //retrieve url from query string
    var url = req.query.url; 

    console.log("Searching for:" + url);
    clarifai.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", url).then(
        function (response) {
            // console.log(response.outputs[0].data.colors);
            var rawColor = response.outputs[0].data.colors;
            var domColor = 0;
            var tempInd = 0;
            for (var i = 0; i < rawColor.length; i++) {
                if (rawColor[i].value > domColor) {
                    domColor = rawColor[i].value;
                    tempInd = i;
                }
            }
            // console.log(domColor + " ind: " + tempInd);

            colorName = rawColor[tempInd].w3c.name;
            console.log("Dominant Color Var:", colorName);
            scraper(colorName, res);
        },

        function (err) {
            console.log("Error: ", err)
        }
    );

});







