'use strict';

const YELP_SEARCH_URL = '';

const BING_API = '';

let x = document.getElementById('location');


// This will watch the submit button pull your location and to render results
function watchSearch() {
 console.log('watchSearch is working');
 $('.search-button').on('click', function(event) {
     getLocation();
 });
};

$(watchSearch);


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude);
}


// This will render the results
function renderResults() {

};


// This pull the information Zomato
function displayZomatoResults() {

};


// This will populate Google Maps with points
function displayGoogleMaps() {

};


// This will display the weather info for that city
function displayWeather() {

}

