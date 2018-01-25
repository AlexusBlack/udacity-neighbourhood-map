import getFoursquareData from './foursquare-api';

/**
 * Create info window for place.
 * Also starts loading additinal info asyncronously
 * 
 * @export
 * @param {place} place 
 * @returns Info window
 */
export function createInfoWindow(place) {
  const infoWindow = new google.maps.InfoWindow({
    content: `<b>${place.name}</b>`
  });

  loadAdditionalInfoWindowData(place, infoWindow);

  return infoWindow;
}

/**
 * Loads additional info about place into info window.
 * 
 * @export
 * @param {place} place 
 * @param {infoWindow} infoWindow 
 */
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
      // If there are some error
      const div = document.createElement('div');
      let content = `<b>${place.name}</b><br><br>`;
      // We need show this on card and let user try to reload
      content += `<i>Load error. (<a href="#">Reload</a>)</i>`;
      div.innerHTML = content;
      div.querySelector('a').addEventListener('click', () => loadAdditionalInfoWindowData(place, infoWindow));
      infoWindow.setContent(div);
    }
  );
}

/**
 * Show info window for provided place
 * 
 * @export
 * @param {place} place 
 */
export function showInfoWindow(place) {
  // If marker don't have info window yet, let's create it
  if(place.marker.infoWindow == null) {
    place.marker.infoWindow = createInfoWindow(place);
  }

  // Making marker bounce once when we showing the info
  place.marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(() => {
    place.marker.setAnimation(null);
  }, 750);

  place.marker.infoWindow.open(place.marker.map, place.marker);
}

/**
 * Close the info windown for place
 * 
 * @export
 * @param {place} place 
 */
export function closeInfoWindow(place) {
  place.marker.infoWindow.close();
}