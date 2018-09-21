
const cheerio = require("cheerio");

const request = require("request");


function scrapeItems (URL){

request("https://www.etsy.com/c/home-and-living/home-decor?explicit=1&ref=catcard-a-1002-567580183&page=1", function(err,response,body){

    if (err) console.error(err);
    var $ = cheerio.load(body);

    var resultsURL = [];
    var resultsPrice = [];
    var resultsName = [];
    var resultsImage = [];

    $(".currency-value").each(function(i, e){
        var price = $(e).text();
        resultsPrice.push(price);
    });

    $("p.text-body").each(function(i, e){
        var name = $(e).text();
        resultsName.push(name);
    });

    $(".width-full.display-block.position-absolute").each(function(i, e){
        var image = $(e).attr();
        resultsImage.push(image);
    });

    $(".display-inline-block.listing-link").each(function(i, e){
        var url = $(e).attr();
        resultsURL.push(url);
    });

    //  results.push({
    //    price: "price",
    //    image: "image",
    //    name: "name",
    //    url: "url",
    //  });

     console.log("name" + resultsName);
     console.log(resultsImage);
     console.log(resultsURL);
     console.log("price" + resultsPrice);

     

})

};

scrapeItems();
