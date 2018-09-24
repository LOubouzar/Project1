// if you haven't already, install the SDK with "npm install sightengine --save"

function imager() {
var sightengine = require('sightengine')('980518813', 'z2ueM47SUrE3JDMUURmq');
sightengine.check(['properties']).set_url('https://i.etsystatic.com/15309986/r/il/43c914/1528912866/il_570xN.1528912866_6ht5.jpg').then(function(result) {
  // The result of the API
  // console.log(result.colors);
  console.log("Hex Code of Dominant Color: ", result.colors.dominant.hex);
  var hexColor = result.result.colors.dominant.hex
}).catch(function(err) {
  // Error
});

// var sightengine = require('sightengine')('980518813', 'z2ueM47SUrE3JDMUURmq');
// sightengine.check(['properties']).set_file('/full/path/to/image.jpg').then(function(result) {
//   // The result of the API
//   console.log("Hex Code of Dominant Color: ", result.colors.dominant.hex);
// }).catch(function(err) {
//   // Error
// });
var pantone = require('pantone')

pantone({ hex: hexColor }, hexCallback) // you can also use `rgb` instead of `hex`
 
function hexCallback(err, results) {
  if (err) throw new Error(err)
  console.log(results)
}
};

imager();