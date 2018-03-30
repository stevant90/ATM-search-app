function initMap() {
    var uluru = { lat: -34.397, lng: 150.644 };
    var map = new google.maps.Map(document.getElementById('out'), {
        zoom: 10,
        center: uluru
    });

    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
    
}