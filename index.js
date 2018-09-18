'use strict';

const YELP_SEARCH_URL = 'https://api.yelp.com/v3/businesses/search';

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
    getDataFromYelp(position);
}


// This will get the data from Yelp
function getDataFromYelp(position, callback) {
    const query = {
        categories: 'coffee, All',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    }
    $.ajax({
        url: YELP_SEARCH_URL,
        dataType: 'json',
        data: query,
        headers: {'Authorization': 'Bearer 9j3HnqBfLRcO9JiDFUYz69dzLNshTTlbqSWE7NtU8-tiqCh-CIHJ3sRddNUDs0laaBWhRf6ElNWJu63tKRuJeO4QBVo-EfApe_MFyMdBSFescObdKHNIGYENcqidW3Yx', 'origin': 'http://localhost'}
    }, function(data){console.log(data)});
    // $.getJSON(YELP_SEARCH_URL, query, callback);
}

// This will render the results
function renderResults() {

};


// This pull the information Zomato
function displayZomatoResults() {

};


// This will populate Google Maps with points
function displayBingMaps() {

};