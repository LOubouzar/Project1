// require("dotenv").config();

// // var bodyParser = require("body-parser");
// var imaggaapiKey = process.env.IMAGGA_ID
// var imaggaapiSecret = process.env.IMAGGA_SECRET

// // Parses our HTML and helps us find elements
// var cheerio = require("cheerio");
// // Makes HTTP request for HTML page
// var request = require("request");

// //GET request in server for API 
// function scraper(colorsName0) {
//     var results = [];
//     request("https://www.etsy.com/search/art-and-collectibles?q=" + colorsName0 + "&explicit=1", function (err, res, body) {

//         console.log("Etsy Scraper Variable: " + colorsName0);
//         if (err) console.error(err);
//         var $ = cheerio.load(body);

//         var resultsURL = [];
//         var resultsPrice = [];
//         var resultsName = [];
//         var resultsImage = [];
        

//         $(".currency-value").each(function (i, e) {
//             var price = $(e).text();
//             resultsPrice.push(price);
//         });

//         $("p.text-body").each(function (i, e) {
//             var name = $(e).text();
//             resultsName.push(name);
//         });

//         $(".width-full.display-block.position-absolute").each(function (i, e) {
//             var image = $(e).attr();
//             resultsImage.push(image);
//         });

//         $(".display-inline-block.listing-link").each(function (i, e) {
//             var url = $(e).attr();
//             resultsURL.push(url);
//         });

//          results.push({
//            price: resultsPrice,
//            image: resultsImage,
//            name: resultsName,
//            url: resultsURL,
//          });

//         // console.log("name" + resultsName);
//         // console.log(resultsImage);
//         // console.log(resultsURL);
//         // console.log("price" + resultsPrice);
//         console.log(results);

//         return results;

//     });
// };

// //URL image color extractor and console logged to the CLI
// function imager() {
//     var requestImagga = require("request"),
//         imageUploadURL = "https://i.etsystatic.com/15309986/r/il/43c914/1528912866/il_570xN.1528912866_6ht5.jpg";

//     requestImagga.get("https://api.imagga.com/v1/colors?url=" + encodeURIComponent(imageUploadURL), function (error, response, body) {
//         // var b = JSON.parse(body);
//         console.log(response);
//         //Console log of the General JSON of the image information API
//         // console.log(b.results[0].info.image_colors[0]);
//         // var colorsName0 = b.results[0].info.image_colors[0].closest_palette_color;

//         // console.log("Primary Closest Color Name: ", colorsName0);

//         // scraper(colorsName0);

//     }).auth(imaggaapiKey, imaggaapiSecret, true);
// };

// imager();

// var request = require('request'),
// apiKey = imaggaapiKey,
// apiSecret = imaggaapiSecret,
//     imageUrl = 'https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg';

// request.get('https://api.imagga.com/v1/colors?url='+encodeURIComponent(imageUrl), function (error, response, body) {
//     console.log('Status:', response.statusCode);
//     console.log('Headers:', JSON.stringify(response.headers));
//     console.log('Response:', body);
// }).auth(apiKey, apiSecret, true);

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
