define(function (require) {
    
    var address = require('./constants');
    var showUI = require('./showUI');
    var errors = require('./handleErrors');

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var baseUrl = address.baseUrl;
    var getAllPlaces = address.getAllPlaces;
    var radiusAndTerm = address.radiusAndTerm;
    var placeDetails = address.placeDetails;
    var textSearchUrl = address.textSearchUrl;

    var placesKey = address.placesKey;

    var refreshMap = showUI.refreshMap;
    var displayList = showUI.displayList;
    var refreshMapOnInputSearch = showUI.refreshMapOnInputSearch;


    function getCurrentPosition(success, error) {

        navigator.geolocation.getCurrentPosition(success, error);

    }

    function getAllNearPlaces(latitude, longitude) {


        document.getElementById('searchATM').addEventListener('click', function () {

            if (document.getElementById('atm-list').innerText !== '') {
                return;
            }

            fetch(proxyUrl + baseUrl + getAllPlaces + latitude + ',' + longitude + radiusAndTerm + placesKey)
                .then(response => response.json())
                .then(response => {
                    getSinglePlace(response.results.slice(0, 10));
                    refreshMap(response.results.slice(0, 10), latitude, longitude);

                }).catch(error => alert('Something went wrong'));

        }, false);

    }

    function getSinglePlace(places) {

        for (var i = 0; i < places.length; i++) {
            var placeId = places[i].place_id;

            fetch(proxyUrl + baseUrl + placeDetails + placeId + placesKey)
                .then(response => response.json())
                .then(response => displayList(response.result))
                .catch(error => alert('Something went wrong'));
        }
    }

    function searchPlaceByUserInput(latitude, longitude) {

        document.getElementById('search-place-btn').addEventListener('click', function () {

            var input = document.getElementById('search-place');
            var location = input.value;

            if (!location) {
                errors.handleInputError();
                return;
            }

            fetch(proxyUrl + baseUrl + textSearchUrl + location + '+' + placesKey)
                .then(response => response.json())
                .then(response => refreshMapOnInputSearch(response.results, latitude, longitude))
                .catch(error => alert('Something went wrong'));

            input.value = '';

        }, false);
    }

    return {

        getCurrentPosition: getCurrentPosition,
        getAllNearPlaces: getAllNearPlaces,
        getSinglePlace: getSinglePlace,
        searchPlaceByUserInput: searchPlaceByUserInput

    };
});

