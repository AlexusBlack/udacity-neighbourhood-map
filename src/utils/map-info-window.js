import getFoursquareData from './foursquare-api';

export function createInfoWindow(place) {
  const infoWindow = new google.maps.InfoWindow({
    content: `<b>${place.name}</b>`
  });

  loadAdditionalInfoWindowData(place, infoWindow);

  return infoWindow;
}

export function loadAdditionalInfoWindowData(place, infoWindow) {
  infoWindow.setContent(`<b>${place.name}</b><br><br>Loading...`);

  getFoursquareData(place).then(
    (info) => {
      let content = `<b>${place.name}</b><br><br>`;
      if(!(info.address == null)) content += `${info.address}<br>`;
      if(!(info.city == null)) content += `${info.city}<br>`;
      if(!(info.phone == null)) content += `<a href='tel:${info.phone}'>${info.formattedPhone}</a>`;
      
      infoWindow.setContent(content);
    },
    (error) => {
      const div = document.createElement('div');
      let content = `<b>${place.name}</b><br><br>`;
      content += `<i>Load error. (<a href="#">Reload</a>)</i>`;
      div.innerHTML = content;
      div.querySelector('a').addEventListener('click', () => loadAdditionalInfoWindowData(place, infoWindow));
      infoWindow.setContent(div);
    }
  );
}

export function showInfoWindow(place) {
  if(place.marker.infoWindow == null) {
    place.marker.infoWindow = createInfoWindow(place);
  }

  place.marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(() => {
    place.marker.setAnimation(null);
  }, 750);

  place.marker.infoWindow.open(place.marker.map, place.marker);
}

export function closeInfoWindow(place) {
  place.marker.infoWindow.close();
}