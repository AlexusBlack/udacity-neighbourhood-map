ko.bindingHandlers.mapMarkers = {
  update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    // Unwrapping markers list
    let placesList = ko.utils.unwrapObservable(valueAccessor());

    // TODO: We can have some sophisticated marker caching here if we need

    let createMarkers = () => {
      // Cleaning old markers
      if(typeof(element.markers) != 'undefined') {
        for(let marker of element.markers) {
          marker.setMap(null);
        }
      }
      element.markers = [];

      for(let marker of placesList) {
        let gmarker = new google.maps.Marker({
          position: marker.location,
          map: element.googleMap,
          title: marker.name
        });
        element.markers.push(gmarker);
      }
    };
    
    if (document.readyState === 'complete') {
      createMarkers();
    } else {
      google.maps.event.addDomListener(window, 'load', createMarkers);
    }
  }
};