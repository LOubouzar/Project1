// Dependencies
var path = require("path");
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");
var bodyParser = require('body-parser');

//Express Configuration
var express = require("express");
var app = express();

//static media content serve to home.html
app.use(express.static("app/public"));

//Clarifai Config
const Clarifai = require("clarifai");
require("dotenv").config();
var apiKey = process.env.apiKey
var clarifai = new Clarifai.App({ apiKey: apiKey });

//Get POST input from file uploader on client page and out puts a stored variable to feed in to the clarifai api as userURL
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());



// app.post("/", (req, res) => {
// 	console.log(req.body.value);
//     // outputs input's value
//     res.send("URL received");
//     var userURL = req.body.value;
//     console.log("Inside Post:", userURL);
// });
// console.log("Outside Post:", userURL);

//clarifai API 
var colorName = "";
clarifai.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", userURL).then(
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
        scraper(colorName);
    },

    function (err) {
        console.log("Error: ", err)
    }
);

//Etsy Scraper
function scraper(color) {
    var results = [];
    request("https://www.etsy.com/search/art-and-collectibles?q=" + color + "&explicit=1", function (err, res, body) {

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

        return results;
    });
};

var PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

app.get("/", function (req, res) {
    console.log("Get request check");
    res.sendFile(path.join(__dirname, "/./app/public/home.html"));
});







