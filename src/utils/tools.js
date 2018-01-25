import PlacesLoadingException from '../exceptions/places-loading-exception';
import { showInfoWindow, closeInfoWindow } from './map-info-window';

import shopIcon from '../../img/shop-icon.svg';
import geekIcon from '../../img/geek-icon.svg';
import restaurantIcon from '../../img/restaurant-icon.svg';

export {
  clearMap, createMarker, loadPlaces
}

/**
 * Clear google maps from markers and infoWindows
 * 
 * @param {googleMapObj} map 
 */
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

/**
 * Returns icon for provided place,
 * which is determined by place category
 * 
 * @param {place} place 
 * @returns 
 */
function getPlaceIcon(place) {
  if(place.category == 'groceries') {
    return shopIcon;
  } else if(place.category == 'geeks') {
    return geekIcon;
  } else if(place.category == 'restorant') {
    return restaurantIcon;
  }
}

/**
 * Returns marker for the provided place
 * 
 * @param {place} place 
 * @returns Marker
 */
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

/**
 * Loads places from JSON file asyncronously
 * 
 * @returns Promise(Array(Places))
 */
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