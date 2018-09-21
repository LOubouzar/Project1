require("dotenv").config();
// var keys = require("./keys.js");

var imaggaapiKey = process.env.IMAGGA_ID
var imaggaapiSecret = process.env.IMAGGA_SECRET

var etsyapiKey = process.env.ETSY_ID
var etsyapiSecret = process.env.ETSY_ID


// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

function scraper(colorsName0) {
    request("https://www.etsy.com/search/art-and-collectibles?q=" + colorsName0 +"&explicit=1", function(error, response, html) {

        console.log("Etsy Scraper Variable: " + colorsName0);
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);
        
        // An empty array to save the data that we'll scrape
        var results = [];
        
        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $("ul.reorderable-listing-results").each(function(i, element) {
            
            // Save the text of the element in a "title" variable
            var listing = $(element).text();
        
             // In the currently selected element, look at its child elements (i.e., its a-tags),
            // then save the values for any "href" attributes that the child elements may have
            var link = $(element).children().attr("href");
        
            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
            Listing: listing,
            link: link
            
        });
        });
        // Log the results once you've looped through each of the elements found with cheerio
        console.log("Scraper Results: " + results);
        });
};

//URL image color extractor and console logged to the CLI
var requestImagga = require("request"),
    imageUploadURL = "https://i.etsystatic.com/15309986/r/il/43c914/1528912866/il_570xN.1528912866_6ht5.jpg";

requestImagga.get("https://api.imagga.com/v1/colors?url=" + encodeURIComponent(imageUploadURL), function (error, response, body) {
    var b = JSON.parse(body);
    //Console log of the General JSON of the image information API
    // console.log(b.results[0].info.image_colors[0]);
    var colorsName0 = b.results[0].info.image_colors[0].closest_palette_color;
    
    console.log("Primary Closest Color Name: ", colorsName0);
       
    scraper("Passing Imagga API result to Scraper: " + colorsName0);

}).auth(imaggaapiKey, imaggaapiSecret, true);

// file uploader to Imagga API  https://docs.imagga.com/#content
// var fs = require('fs'),
//     request = require("request"),
//     filePath = "/path/to/image.jpg",
//     formData = {
//         image: fs.createReadStream(filePath)
//     };

// request.post({ url: 'https://api.imagga.com/v1/content', formData: formData },
//     function (error, response, body) {
//         var b = JSON.parse(body);
//         var colorsName0 = b.results[0].info.image_colors[0].closest_palette_color;
//         var colorsHTML0 = b.results[0].info.image_colors[0].closest_palette_color_html_code;
//         var colorsPercent0 = b.results[0].info.image_colors[0].percent;
//         var colorsName1 = b.results[0].info.image_colors[1].closest_palette_color;
//         var colorsHTML1 = b.results[0].info.image_colors[1].closest_palette_color_html_code;
//         var colorsPercent1 = b.results[0].info.image_colors[1].percent;
//         console.log("Primary Closest Color Name: ", colorsName0);
//         console.log("Primary HTML Color Code: ", colorsHTML0);
//         console.log("Primary Color Percentage: ", colorsPercent0, "%");
//         console.log("Secondary Closest Color Name: ", colorsName1);
//         console.log("Secondary HTML Color Code: ", colorsHTML1);
//         console.log("Secondary Color Percentage: ", colorsPercent1, "%");
//     }).auth(imaggaapiKey, imaggaapiSecret, true);

//In Etsy's API, we will need to pull image > fields > hex_code to match Imagga

//Code to pass into Etsy.
// var requestEtsy = require("request");
    
// requestEtsy.get("https://openapi.etsy.com/v2/listings/active?api_key=" + etsyapiKey, function (error, response, body) {
//     console.log(error);
//     for (var i =0; i < results.length; i++) {
//         console.log(body.results[i].color);}
// });
    
// First, tell the console what server.js is doing
