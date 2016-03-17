var breedlist = (function($){

  $.ajax({
    url: "https://ajax-puppies.herokuapp.com/breeds.json",
    method: "GET",
    success: function(breeds){
      var $dropdown = $('select');

      breeds.forEach(function(breed){
        var $breed = $('<option>' + breed.name + '</option>');
        $breed.attr("value", breed.name);
        $dropdown.append($breed);

      })
    }
  });

})($);

