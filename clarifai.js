// const Clarifai = require("clarifai");
// require("dotenv").config();

// var apiKey = process.env.apiKey

// var app = new Clarifai.App({ apiKey: apiKey });

// app.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", "https://samples.clarifai.com/metro-north.jpg").then(
//     function (response) {
//         // console.log(response.outputs[0].data.colors);
//         var rawColor = response.outputs[0].data.colors;
//         var domColor = 0;
//         var tempInd = 0;
//         for (var i = 0; i < rawColor.length; i++) {
//             if (rawColor[i].value > domColor) {
//                 domColor = rawColor[i].value;
//                 tempInd = i;
//             }
//         }
//         // console.log(domColor + " ind: " + tempInd);
//         console.log(rawColor[tempInd].w3c.name);
//         var colorName = rawColor[tempInd].w3c.name;
//     },

//     function (err) {
//         console.log("Error: ", err)
//     }
// );