function AppModel() {
  this.map = ko.observable({
    center: {lat: -37.821410, lng: 144.959343},
    zoom: 15
  });

  this.places = ko.observableArray([]);
}