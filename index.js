'use strict';

const YELP_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?';

const GEO_SEARCH_URL = 'https://www.mapquestapi.com/geocoding/v1/address';

let x = document.getElementById('fail-text');

let lat = [];

let lng = [];


// This will watch the submit button pull your location and to render results
function watchUseYourLocation() {
 $('.your-location').on('click', function(event) {
     getLocation();
 });
};

$(watchUseYourLocation);


// This will watch the search input for the geosearch info
function watchGeoSearch(){
    $('#geo-search').submit(function(event) {
        event.preventDefault();
        let query = {
            key: 'EaTfTKVe0lWnGBL9AOM4zpA4rm6O28HB',
            location: $('#geo-code').val()
        }
        $.getJSON(GEO_SEARCH_URL, query, function(data) {
            lat = data.results[0].locations[0].latLng.lat;
            lng = data.results[0].locations[0].latLng.lng;
            searchActivated();
            $('#geo-code').val('')
        });
        
    })
}

$(watchGeoSearch);


// This will request for your location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        $('.search-text, .fail').toggle();
        x.innerHTML = "Geolocation is not supported by this browser.";
        watchHomeButton();
    }
}


// This will show the error message when the geo locaiton isn't available
function showError(error) {
    $('.search-text, .fail').toggle();
    switch(error.code) {        
      case error.PERMISSION_DENIED:
        x.innerHTML = "You have denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
    watchHomeButton();
  }

function watchHomeButton() {
    $('.home-button').on('click', function(event) {

        if ($('.map-box').is(':visible')) {
            $('.map-box, .search-area, .search-text').toggle();
            $('.fail').hide();
            map.remove();
            document.getElementById('map-box').innerHTML += '<div id="map"></div>';
        
        } else {
            $('.search-text').show();
            $('.fail').hide();
        }
    });
}

// This will hide the search related stuff and render the map
function searchActivated() {
    $('.search-text').toggle();
    $('#floatingBarsG').toggle();
    getDataFromYelp();
}


// This will push your location to Yelp
function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    searchActivated();
}


// This will get the data from Yelp
function getDataFromYelp() {
    const query = {
        categories: 'coffee, All,bubbletea',
        radius: 8047,
        latitude: lat,
        longitude: lng,
        open_now: true,
        limit: 30,
    }
    $.ajax({
        url: YELP_SEARCH_URL,
        dataType: 'json',
        method: 'GET',
        data: query,
        headers: {'Authorization': 'Bearer 9j3HnqBfLRcO9JiDFUYz69dzLNshTTlbqSWE7NtU8-tiqCh-CIHJ3sRddNUDs0laaBWhRf6ElNWJu63tKRuJeO4QBVo-EfApe_MFyMdBSFescObdKHNIGYENcqidW3Yx'},
        success: function(data) {
            $('.map-box').toggle();
            $('.search-area, #floatingBarsG').toggle();
            renderMap(data);
        }
    });
}


// This will display the map
function renderMap(data, resize) {
    L.mapquest.key = 'EaTfTKVe0lWnGBL9AOM4zpA4rm6O28HB';

    var map = L.mapquest.map('map', {
      center: ([lat, lng]),
      layers: L.mapquest.tileLayer('map'),
      zoom: 13
    });
    
    map.addControl(L.mapquest.control());
    pinYourLocation(map);
    populateMap(data, map);
    $("#map").trigger("resize");
}


// This is to resize Mapquest 
$(window).on("resize", function () { $("#map").height($(window).height()-65);}).trigger("resize");


// This will show your location on the map
function pinYourLocation(map) {
    L.mapquest.textMarker([lat, lng], {
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
    $("#mapid").trigger("resize");
}


// This will populate the results on the map
function populateMap(data, map) {
    data.businesses.forEach(business => {
        let lati = business.coordinates.latitude;
        let long = business.coordinates.longitude;
        L.mapquest.textMarker([lati, long], {
            text: business.name,
            type: 'marker',
            position: 'bottom',
            alt: business.alias,
            icon: {
                primaryColor: '#333333',
                secondaryColor: '#333333',
                size: 'sm',
            },
        }).bindPopup(`${business.name} <br>Rating: ${business.rating}/5 <br>Reviews: ${business.review_count} <br><a href=${business.url}>Yelp</a>`).openPopup().addTo(map);
    });
    watchHomeButton();  
};