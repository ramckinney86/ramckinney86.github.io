// Client id
// DS5LJGZXMUKLWEOYXYUGX1ZZFVO4YCYEYYOUHEO2G55QHXG3
// Client secret
// QUUGLQNLTASFWQEADZJGYWQBF4N15L0OA0WTNZNOCK210TOM

// manhattan = 40.7432265,-73.992014
// home 40.639839,-74.0139687
// food category id = 4d4b7105d754a06374d81259

// OLD https://api.foursquare.com/v2/venues/search?ll=40.7,-74&query=nachos&categoryId=4d4b7105d754a06374d81259&client_id=DS5LJGZXMUKLWEOYXYUGX1ZZFVO4YCYEYYOUHEO2G55QHXG3&client_secret=QUUGLQNLTASFWQEADZJGYWQBF4N15L0OA0WTNZNOCK210TOM&v=20160409

// https://api.foursquare.com/v2/venues/explore?ll=40.7,-74&query=nachos&categoryId=4d4b7105d754a06374d81259&client_id=DS5LJGZXMUKLWEOYXYUGX1ZZFVO4YCYEYYOUHEO2G55QHXG3&client_secret=QUUGLQNLTASFWQEADZJGYWQBF4N15L0OA0WTNZNOCK210TOM&v=20160409

// Google Maps Key = AIzaSyA2nELiFckMYPPmpE03y4zYxk6gaz_vRq4

var map;
// var nachoLoc = [];
// var nachoName = [];
// var nachoTxt = [];
var manhattan = {lat: 40.7016022, lng: -74.0019234};
var mapOptions = {center: manhattan, scrollwheel: false, zoom: 14};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function init() {
  var url = 'https://api.foursquare.com/v2/venues/explore?ll=40.7,-74&query=nachos&client_id=DS5LJGZXMUKLWEOYXYUGX1ZZFVO4YCYEYYOUHEO2G55QHXG3&client_secret=QUUGLQNLTASFWQEADZJGYWQBF4N15L0OA0WTNZNOCK210TOM&v=20160409';

  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    success: function(api) {
      var data = api.response.groups[0].items;
      data.forEach(function(spot){
        var lat = spot.venue.location.lat;
        var lng = spot.venue.location.lng;
        var venueLatLng = {lat, lng};

        var venueName = spot.venue.name;
        var venueTxt = spot.tips[0].text;
        var $venueTxt = "<p>" + venueTxt + "</p>";

        var contentString = "<div class='infopane'><h3>" + venueName + "</h3></div>";
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        var marker = new google.maps.Marker({
          map: map,
          position: venueLatLng,
          title: venueName
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
          $('#info').empty();
          $('#info').append(contentString + $venueTxt); 
        });
        // nachoLoc.push(venueLatLng);
        // nachoName.push(venueName);
        // nachoTxt.push(venueTxt);
      })
    }
  })
};

$(document).ready(function() {
  var nachosAppReference = new Firebase("https://mega-dope-chos.firebaseio.com/");
  $('#comment-form').submit(function(e) {
    e.preventDefault()
    var comment = $('#userComment').val();
    var username = $('#username').val();
    $('#userComment').val('');
    $('#username').val('');
    var nachosReference = nachosAppReference.child('comments');
    nachosReference.push({
      username: username,
      comment: comment
    })
  })
  
  function getFanMessages() {
    nachosAppReference.child('comments').on('value', function(results){
      $("#commentSubmit").click(function() {
        $('#pastUserComments').empty();
      })
      var values = results.val();
      for(var key in values) {
        var msg = values[key];
        var container = $("<p><span class='un'>" + msg.username + "</span> says '" + msg.comment + "'</p>");
        container.appendTo('#pastUserComments');
      }
    })
  }
  init();
  getFanMessages();
})

