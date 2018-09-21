$(document).ready(function () {
  $('.parallax').parallax();

  function displayPreview(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          $('#imgPreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }

    function getResultsFromEtsy(input){
        //call API

    }
    
    $("#imgInp").change(function() {
      displayPreview(this);
      getResultsFromEtsy(this);
    });

});



