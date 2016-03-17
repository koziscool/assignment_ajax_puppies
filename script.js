var breedlist = (function($){

  $.ajax({
    url: "https://ajax-puppies.herokuapp.com/breeds.json",
    method: "GET",
    success: function(breeds){
      var $dropdown = $('select');

      breeds.forEach(function(breed){
        var $breed = $('<option>' + breed.name + '</option>');
        $breed.attr("value", breed.name);
        $breed.attr('data-id', breed.id);
        $dropdown.append($breed);

      })
    }
  });

})($);


var handlePuppy = function( puppyObj, $puppyList ) {
  var name = puppyObj.name;
  var breed = puppyObj.breed.name;
  var createdAt = puppyObj.created_at;

  var puppyString = '<li><b>' + name + '</b> (' + breed + ') ' + createdAt + '</li>'
  var adoptLink = $('<a class="adopt" href="#">adopt</a>'); 
  adoptLink.attr("data", puppyObj.id);
  var $listElt = $(puppyString);
  $listElt.append(adoptLink);
  $puppyList.append( $listElt);
};

var updatePuppyResponse = function( data ) {
  // console.dir(data);
  var $puppyList = $('.puppy-list')
  data.forEach( function( puppyObj ) {
    handlePuppy(puppyObj, $puppyList );
  } )
};

var adoptPuppy = function( event ) {
  var id = $(event.target).attr('data');

  $.ajax({
    url: 'https://ajax-puppies.herokuapp.com/puppies/' + id + '.json',
    method: 'DELETE'
  })

};

var updatePuppyRequest = function(e) {
  e.preventDefault();
  console.log('im here');
  var url = "https://ajax-puppies.herokuapp.com/puppies.json";
  var method = "GET";

  $.get( url, {}, updatePuppyResponse);
};

var createPuppy = function(e) {
  e.preventDefault();

  var $formString = $('#puppy-form').serialize();
  console.log($formString);
}

$(document).ready( function(){
  $("#refresh-puppies").on('click', updatePuppyRequest);
  $(".puppy-list").delegate('.adopt', 'click', adoptPuppy);
  $(".register-puppy").on('click', createPuppy);
});
