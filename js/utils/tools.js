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

  marker.addListener('click', () => setActivePlace(place));

  return marker;
}

function createInfoWindow(place) {
  const infoWindow = new google.maps.InfoWindow({
    content: place.name
  });

  getFoursquareData(place).then((info) => {
    let content = `<b>${place.name}</b><br><br>`;
    if(!(info.address == null)) content += `${info.address}<br>`;
    if(!(info.city == null)) content += `${info.city}<br>`;
    if(!(info.phone == null)) content += `<a href='tel:${info.phone}'>${info.formattedPhone}</a>`;
    infoWindow.setContent(content);
  });

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

async function getFoursquareData(place) {
  const response = await fetch(`https://api.foursquare.com/v2/venues/search?` + 
        `ll=${place.location.lat},${place.location.lng}&query=${place.name}&` +
        `client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&v=20180122`);

  if (response.status !== 200) {
    console.error('Looks like there was a problem with loading foursquare info. Status Code: ' +
      response.status);
      // TODO: show snackbar
    return;
  }
  
  const data = await response.json();
  const placeData = data.response.venues[0];
  const info = {
    address: placeData.location.address,
    city: placeData.location.city,
    phone: placeData.contact.phone,
    formattedPhone: placeData.contact.formattedPhone
  };
  return info;
}