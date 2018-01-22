ko.bindingHandlers.mapMarkers = {
  update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    // Unwrapping markers list
    let placesList = ko.utils.unwrapObservable(valueAccessor());
    console.log(placesList);

    let createMarkers = () => {
      for(let marker of placesList) {
        let gmarker = new google.maps.Marker({
          position: marker.location,
          map: element.googleMap,
          title: marker.name
        });
      }
    };
    
    google.maps.event.addDomListener(window, 'load', createMarkers);
  }
};