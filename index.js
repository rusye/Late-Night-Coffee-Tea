'use strict';

const YELP_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?';

const MAPQUEST_API = '';

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
function getDataFromYelp(position) {
    const query = {
        categories: 'coffee, All' + 'bubbletea, [AU, BE, BR, CA, CL, CZ, DE, DK, FI, FR, GB, HK, IE, IT, JP, MY, NL, NO, NZ, PH, PL, PT, SE, SG, TW, US]',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        // open_now: true,
    }
    $.ajax({
        // url: `https://cors-anywhere.herokuapp.com/${YELP_SEARCH_URL}latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&categories=coffee,All`,
        url: YELP_SEARCH_URL,
        dataType: 'json',
        method: 'GET',
        data: query,
        headers: {'Authorization': 'Bearer 9j3HnqBfLRcO9JiDFUYz69dzLNshTTlbqSWE7NtU8-tiqCh-CIHJ3sRddNUDs0laaBWhRf6ElNWJu63tKRuJeO4QBVo-EfApe_MFyMdBSFescObdKHNIGYENcqidW3Yx'},
        success: function(data){console.log(data)}
});
    // $.getJSON(YELP_SEARCH_URL, query, callback);
}


// This will render the results
function renderResults() {

};


// This will populate Map Quest with points
function displayMapQuest(data) {

};