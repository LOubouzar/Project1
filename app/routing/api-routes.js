require("dotenv").config();

var keys = require("./keys.js");

//URL image color extractor
var requestImagga = require("request"),
    apiKey = "acc_273f711165a30ad",
    apiSecret = "6a7cf9ae56b11a3234d86719d0c280df",
    imageUploadURL = "https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg";
    // Verify in code that the imageUpload variable can hold an image to query. We should be 
    //able to use the HTML/CSS form to get the image url to query. we may need to add /content(/<content_id>)
    //if we need to be able to have the user upload an image from their local machine.
    
//Color Extraction from Imagga and console.log to the CLI
requestImagga.get('https://api.imagga.com/v1/colors?url='+encodeURIComponent(imageUploadURL), function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers, null, 2));
    var b = JSON.parse(body);
    var colors = b.results[0].info.image_colors;
    console.log(colors);
    // console.log("Closest Color Palette:", body)
}).auth(apiKey, apiSecret, true);

//Base Code for using an HTML file image uploader. https://docs.imagga.com/#content
// var fs = require('fs'),
//     request = require('request'),
//     apiKey = 'acc_273f711165a30ad',
//     apiSecret = '6a7cf9ae56b11a3234d86719d0c280df',
//     filePath = '/path/to/image.jpg',
//     formData = {
//         image: fs.createReadStream(filePath)
//     };

// request.post({url:'https://api.imagga.com/v1/content', formData: formData},
//     function (error, response, body) {
//         console.log('Status:', response.statusCode);
//         console.log('Headers:', JSON.stringify(response.headers));
//         console.log('Response:', body);
//     }).auth(apiKey, apiSecret, true);

//In Etsy's API, we will need to pull image > fields > hex_code to match Imagga