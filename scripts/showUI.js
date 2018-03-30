define(function (require) {
    

     var convert =  require('../node_modules/cyrillic-to-latin/cyrillicToLatin');
        

    function initMap(longitude, latitude) {

        var target = { lat: longitude, lng: latitude };
        var map = new google.maps.Map(document.getElementById('out'), {
            zoom: 10,
            center: target
        });

        var marker = new google.maps.Marker({
            position: target,
            map: map
        });
    }

    function refreshMap(places, latitude, longitude) {

        var locations = [];

        for (var i = 0; i < places.length; i++) {
            var newLat = places[i].geometry.location.lat;
            var newLng = places[i].geometry.location.lng;

            var obj = { lat: newLat, lng: newLng };
            locations.push(obj);
        }

        var target = { lat: latitude, lng: longitude };
        var map = new google.maps.Map(document.getElementById('out'), {
            zoom: 10,
            center: target
        });

        locations.unshift(target);

        var labels = '0ABCDEFGHIJKLM';

        var markers = locations.map(function (location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });

        var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: '../images/m' });
    }

    function refreshMapOnInputSearch(places, latitude, longitude) {

        var locations = [];

        for (var i = 0; i < places.length; i++) {
            var newLat = places[i].geometry.location.lat;
            var newLng = places[i].geometry.location.lng;

            var obj = { lat: newLat, lng: newLng };
            locations.push(obj);
        }

        var target = { lat: latitude, lng: longitude };
        var map = new google.maps.Map(document.getElementById('out'), {
            zoom: 10,
            center: target
        });

        locations.unshift(target);

        var labels = '0ABCDEFGHIJKLM';

        var markers = locations.map(function (location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });

        var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    }

    function displayList(place) {

        var atmList = document.getElementById('atm-list');
        var listItem = document.createElement('li');
        var span = document.createElement('span');
  
        var bankName = convert(place.name);
        var bankAddress = convert(place.vicinity);

        listItem.classList.add('list-group-item');

        span.innerText = bankAddress;
        listItem.innerText = bankName + ', ';
        listItem.appendChild(span);

        atmList.appendChild(listItem);


    }

    return {

        initMap: initMap,
        refreshMap: refreshMap,
        refreshMapOnInputSearch: refreshMapOnInputSearch,
        displayList: displayList
    };
});