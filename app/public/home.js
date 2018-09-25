//Parallax
$(document).ready(function () {
  $('.parallax').parallax();

//Upload photo form
  // function displayPreview(input) {
  //     if (input.files && input.files[0]) {
  //       var reader = new FileReader();
  //       reader.onload = function(e) {
  //         $('#imgPreview').attr('src', e.target.result);
  //       }
  //       reader.readAsDataURL(input.files[0]);
  //     }
  //   }

  //   function getResultsFromEtsy(input){
  //       //call API

  //   }
    
  //   $("#imgInp").change(function() {
  //     displayPreview(this);
  //     getResultsFromEtsy(this);
  //   });

    // Preview URL button
    $("#btnPreview").on('click', function(){
      $('#imgPreview').attr('src', $("#url").val());
    });

    //Analyze button
    $("#btnAnalyze").on('click', function(){
      // get the results and display in the image list
      $.get("/analyze?url=" + $("#url").val()).then(function(response){
        console.log(response);
        //clear results
        for (let index = 0; index < 12; index++) {
          $("#img" + (index + 1)).attr("src", "./media/placeholderImage.jpg");          
        }
        //display the images results
        for (let index = 0; index < response[0].resultsImage.length; index++) {
          const element = response[0].resultsImage[index];
          $("#img" + (index + 1)).attr("src", element.src);
        }
        //display the url results
        for (let index = 0; index < response[0].resultsURL.length; index++) {
          const element = response[0].resultsURL[index].href;
          console.log(element);
          $("#url" + (index + 1)).attr("href", element);
        }
        //display the name results
        for (let index = 0; index < response[0].resultsName.length; index++) {
          const element = response[0].resultsName[index];
          $("#name" + (index + 1)).text(element);
        }
        //display the price results
        for (let index = 0; index < response[0].resultsPrice.length; index++) {
          const element = response[0].resultsPrice[index];
          $("#price" + (index + 1)).text("$"+(element));
        }

      });
    });
});

// $('#clear-button').on('click', function(e){
//   var $el = $('#file-path-validate');
//   $el.wrap('<form>').closest('form').get(0).reset();
//   $el.unwrap();
// });

