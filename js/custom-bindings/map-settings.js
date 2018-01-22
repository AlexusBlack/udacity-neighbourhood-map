ko.bindingHandlers.mapSettings = {
  init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    // Unwrapping map data
    let settings = ko.utils.unwrapObservable(valueAccessor());
    console.log(settings);

    let initialize = () => element.googleMap = new google.maps.Map(element, settings);
    google.maps.event.addDomListener(window, 'load', initialize);
  }
};