function clearMap(map) {
  if(!(map.markers == null)) {
    for(let marker of map.markers) {
      // closing info windows if open
      if(!(marker.infoWindow == null)) {
        marker.infoWindow.close();
      }
      // removing marker
      marker.setMap(null);
    }
  }
  // cleaning markers storage
  map.markers = [];
}

function createMarker(place) {
  let marker = new google.maps.Marker({
    position: place.location,
    map: null,
    title: place.name
  });
  marker.addListener('click', markerClickHandler);
  place.active.subscribe((active) => {
    if(active) {
      showInfoWindow(marker);
    }
  });

  return marker;
}

function showInfoWindow(marker) {
  if(!(marker.infoWindow == null)) return;

  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(() => {
    marker.setAnimation(null);
  }, 750);
  marker.infoWindow = new google.maps.InfoWindow({
    content: marker.title
  });
  google.maps.event.addListener(marker.infoWindow, 'closeclick', () => marker.infoWindow = null);
  marker.infoWindow.open(marker.map, marker);
}