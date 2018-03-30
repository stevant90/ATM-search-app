define(function (require) {

    var communication = require('./communicationService');
    var constants = require('./constants');
    var showUI = require('./showUI');

    var startError = document.querySelector('.location-error');

    if (!navigator.geolocation) {
        startError.innerText = 'Geolocation is not supported by your browser';
        return;
    }

    function success(position) {

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        communication.getAllNearPlaces(latitude, longitude);
        communication.searchPlaceByUserInput(latitude, longitude);

        document.getElementById('turnOnLocation').addEventListener('click', function () {

            showUI.initMap(latitude, longitude);
            
            var searchAtmBtn = document.getElementById('searchATM');

            if (document.getElementById('turnOnLocation').innerText == 'Turn off location') {
                document.getElementById('turnOnLocation').innerText = 'Turn on location'
                document.getElementById('atm-list').innerText = '';
                document.querySelector('.location-title').classList.remove('remove-location-title');
                
            } else {
                document.getElementById('turnOnLocation').innerText = 'Turn off location'
                document.querySelector('.location-title').classList.add('remove-location-title');
            }

            document.querySelector('.header-content').classList.toggle('move-header');

        });

    }

    function error() {

        output.innerText = 'Unable to retrieve your location';
    }

    communication.getCurrentPosition(success, error);

    

});
