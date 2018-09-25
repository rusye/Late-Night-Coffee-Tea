'use strict';

const YELP_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?';

let x = document.getElementById('location');


// This will watch the submit button pull your location and to render results
function watchSearch() {
 $('.search-button').on('click', function(event) {
     getLocation();
 });
};

$(watchSearch);


// This will request for your location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


// This will push your location to Yelp
function showPosition(position) {
    $('.search-area').toggle();
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
            renderMap(position, data);
        }
    });
}


// This will display the map
function renderMap(position, data) {
    L.mapquest.key = 'EaTfTKVe0lWnGBL9AOM4zpA4rm6O28HB';

    var map = L.mapquest.map('map', {
      center: ([position.coords.latitude, position.coords.longitude]),
      layers: L.mapquest.tileLayer('map'),
      zoom: 12
    });
    
    map.addControl(L.mapquest.control());
    pinYourLocation(map, position);
    populateMap(data, map);
}


// This will show your location on the map
function pinYourLocation(map, position) {
    L.mapquest.textMarker([position.coords.latitude, position.coords.longitude], {
        text: 'You are here',
        type: 'marker',
        position: 'bottom',
        alt: 'You are here',
        icon: {
            primaryColor: 'F8E71C',
            secondaryColor: '417505',
            size: 'sm',
        },
    }).addTo(map);
}


// This will populate the results on the map
function populateMap(data, map) {
    data.businesses.forEach(business => {
        let lat = business.coordinates.latitude;
        let long = business.coordinates.longitude;
        L.mapquest.textMarker([lat, long], {
            text: business.name,
            type: 'marker',
            position: 'bottom',
            alt: business.alias,
            icon: {
                primaryColor: '#333333',
                secondaryColor: '#333333',
                size: 'sm',
            },
        }).bindPopup(`${business.name} <br>Rating: ${business.rating}/5 <br>Reviews: ${business.review_count}`).openPopup().addTo(map);
    });    
};