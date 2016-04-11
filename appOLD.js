// Client ID: 109380
// Client Secret: 79c1bc5e7fab30a3552cf12f134882177f20a02e 
// Your Access Token (?)  (permissions: public)	 : 79c1bc5e7fab30a3552cf12f134882177f20a02e 

// https://www.strava.com/api/v3/athlete?access_token=79c1bc5e7fab30a3552cf12f134882177f20a02e

// https://www.strava.com/api



var apiKey = '79c1bc5e7fab30a3552cf12f134882177f20a02e';
var apiURL = 'https://www.strava.com/api/v3/athlete?access_token=' + apiKey;


// $.get(apiURL);
$.ajax({
	url: apiURL,
	method: "GET",
	dataType: "jsonp",
	success: function(response) {
		var data = response.data;
		console.log(data)

// 	// 	data.forEach(function(photo){
// 	// 		var photoURL = photo.images.standard_resolution.url;
// 	// 		var imageEl = $('<img src="' + photoURL + '" />');

// 	// 		$('.images').append(imageEl);
// 	// 	});
		
	}
})