function markerClickHandler(e) {
  let marker = this;

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