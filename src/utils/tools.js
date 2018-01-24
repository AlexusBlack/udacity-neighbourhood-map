import PlacesLoadingException from '../exceptions/places-loading-exception';
import { showInfoWindow, closeInfoWindow } from './map-info-window';

export {
  clearMap, createMarker, loadPlaces
}

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

function getPlaceIcon(place) {
  if(place.category == 'groceries') {
    return './img/shop-icon.svg';
  } else if(place.category == 'geeks') {
    return './img/geek-icon.svg';
  } else if(place.category == 'restorant') {
    return './img/restaurant-icon.svg';
  }
}

function createMarker(place) {
  let marker = new google.maps.Marker({
    position: place.location,
    map: null,
    title: place.name,
    icon: getPlaceIcon(place)
  });

  place.active.subscribe((active) => {
    if(active) {
      showInfoWindow(place);
    } else {
      closeInfoWindow(place);
    }
  });

  marker.addListener('click', () => place.active(true));

  return marker;
}

async function loadPlaces() {
  let response;
  try {
    response = await fetch('./places.json');
  } catch(e) {
    throw new PlacesLoadingException('Looks like there was a problem with loading places list.' + e.message);
  }

  if (response.status !== 200) {
    throw new PlacesLoadingException('Looks like there was a problem with loading places list. Status Code: ' + response.status);
  }

  const placesList = await response.json();

  return placesList;
}