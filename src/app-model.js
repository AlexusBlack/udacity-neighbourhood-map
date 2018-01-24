import filterPlaceBySearchString from './utils/filters';
import { loadPlaces } from './utils/tools';

export default function AppModel() {
  let self = this;

  this.errorLoadingPlaces = ko.observable(false);

  this.map = ko.observable({
    center: {lat: -37.821410, lng: 144.959343},
    zoom: 15
  });

  this.filter = ko.observable(localStorage.searchString || '');
  this.filter.subscribe((searchString) => {
    // saving our search string to localStorage
    localStorage.searchString = searchString;
  });

  this.places = ko.observableArray([]);

  this.filteredPlaces = ko.computed(() => {
    if(!self.filter()) {
      return self.places(); 
    }
    return ko.utils.arrayFilter(
      self.places(), 
      (place) => filterPlaceBySearchString(place, self.filter())
    );
  });

  this.loadPlaces = async () => {
    this.errorLoadingPlaces(false);
    const places = await loadPlaces();
    if(places != null) {
      this.addPlace(...places);
    } else {
      this.errorLoadingPlaces(true);
    }
  }

  this.addPlace = function(...placesInfo) {
    for(let placeInfo of placesInfo) {
      let place = {
        name: placeInfo.name,
        location: placeInfo.location,
        category: placeInfo.category,
        active: ko.observable(false)
      };
      place.active.subscribe((state) => placeActiveStateChanged.call(this, place, state));
      this.places.push(place);
    }   
  }

  this.selectPlace = function(e) {
    this.active(true);
  }

  function placeActiveStateChanged(changedPlace, state) {
    if(state == false) return;
    // only one place can be active at the time
    for(let place of this.places()) {
      if(place != changedPlace) {
        place.active(false);
      }
    }
  }
}