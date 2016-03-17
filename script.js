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


var handlePuppy = function( puppyObj, $puppyList ) {
  var name = puppyObj.name;
  var breed = puppyObj.breed.name;
  var createdAt = puppyObj.created_at;
  var $listElt = $('<li>' + name + ' (' + breed + ') ' + createdAt + '</li>');
  $puppyList.append( $listElt);
};

var updatePuppyResponse = function( data ) {
  // console.dir(data);
  var $puppyList = $('.puppy-list')
  data.forEach( function( puppyObj ) {
    handlePuppy(puppyObj, $puppyList );
  } )
};

var updatePuppyRequest = function(e) {
  e.preventDefault();
  console.log('im here');
  var url = "https://ajax-puppies.herokuapp.com/puppies.json";
  var method = "GET";

  $.get( url, {}, updatePuppyResponse);
};

$(document).ready( function(){
  $("#refresh-puppies").on('click', updatePuppyRequest);
});
