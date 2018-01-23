ko.bindingHandlers.mapSettings = {
  init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    // Unwrapping map data
    let settings = ko.utils.unwrapObservable(valueAccessor());

    let initialize = () => element.googleMap = new google.maps.Map(element, settings);
    if(typeof(google) == 'undefined') {
      console.error('google map unavailable');
      return;
    }
    google.maps.event.addDomListener(window, 'load',  initialize);
  }
};