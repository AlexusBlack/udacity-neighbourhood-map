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

  marker.addListener('click', () => setActivePlace(place));

  return marker;
}

function createInfoWindow(place) {
  return new google.maps.InfoWindow({
    content: place.name
  });
}

function showInfoWindow(place) {
  if(place.marker.infoWindow == null) {
    place.marker.infoWindow = createInfoWindow(place);
  }

  place.marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(() => {
    place.marker.setAnimation(null);
  }, 750);

  place.marker.infoWindow.open(place.marker.map, place.marker);
}

function closeInfoWindow(place) {
  place.marker.infoWindow.close();
}

function setActivePlace(placeToActivate) {
  if(placeToActivate.active()) return;
  for(var place of model.places()) {
    if(place != placeToActivate) {
      place.active(false);
    } else {
      place.active(true);
    }
  }
}