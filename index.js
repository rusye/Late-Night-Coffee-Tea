'use strict';

const YELP_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?';

// const MAPQUEST_API = 'https://www.mapquestapi.com/staticmap/v5/map?key=EaTfTKVe0lWnGBL9AOM4zpA4rm6O28HB&';

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
        categories: 'coffee, All,bubbletea',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        open_now: true,
    }
    $.ajax({
        url: YELP_SEARCH_URL,
        dataType: 'json',
        method: 'GET',
        data: query,
        headers: {'Authorization': 'Bearer 9j3HnqBfLRcO9JiDFUYz69dzLNshTTlbqSWE7NtU8-tiqCh-CIHJ3sRddNUDs0laaBWhRf6ElNWJu63tKRuJeO4QBVo-EfApe_MFyMdBSFescObdKHNIGYENcqidW3Yx'},
        success: function(data) {
            console.log(data);
            renderMap(position, data);
        }
    });
}

function renderMap(position, data) {
    L.mapquest.key = 'EaTfTKVe0lWnGBL9AOM4zpA4rm6O28HB';

    var map = L.mapquest.map('map', {
      center: ([position.coords.latitude, position.coords.longitude]),
      layers: L.mapquest.tileLayer('map'),
      zoom: 12
    });
    
    map.addControl(L.mapquest.control());
    // Have my position show up in a differnt style of marker
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
    populateMap(data, map);
}


// This will render the results, don't think I need this function if I'm using
// map as a background image with an overlay of sorts.
function populateMap(data, map) {
    data.businesses.forEach(business => {
        let lat = business.coordinates.latitude;
        let long = business.coordinates.longitude;
        L.marker([lat, long]).addTo(map);
    });    
};