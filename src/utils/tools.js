import getFoursquareData from './foursquare-api';

export {
  clearMap, showSnackbar, createMarker, loadPlaces
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

function showSnackbar(message, timeout = -1) {
  if(timeout == -1) timeout = 2000;
  const snackbarContainer = document.getElementById('snackbar-container');
  const data = {
    message: message,
    timeout: timeout
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
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

function createInfoWindow(place) {
  const infoWindow = new google.maps.InfoWindow({
    content: `<b>${place.name}</b><br><br>Loading...`
  });

  getFoursquareData(place).then(
    (info) => {
      let content = `<b>${place.name}</b><br><br>`;

      if(info == null) {
        content += `<i>Load error</i>`;
      } else {
        if(!(info.address == null)) content += `${info.address}<br>`;
        if(!(info.city == null)) content += `${info.city}<br>`;
        if(!(info.phone == null)) content += `<a href='tel:${info.phone}'>${info.formattedPhone}</a>`;
      }
      
      infoWindow.setContent(content);
    }
  );

  return infoWindow;
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

async function loadPlaces() {
  let response;
  try {
    response = await fetch('./places.json');
  } catch(e) {
    console.error('Looks like there was a problem with loading places list.' + e.message);
    alert('We were unable to load places list, please try to reload it with button in sidebar');
    return;
  }

  if (response.status !== 200) {
    showSnackbar('Looks like there was a problem with loading places list. Status Code: ' + response.status);
    return;
  }

  const placesList = await response.json();

  return placesList;
}