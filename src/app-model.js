import filterPlaceBySearchString from './utils/filters';
import { loadPlaces } from './utils/tools';
import mdlDialog from './utils/mdl-dialog';

export default function AppModel() {
  let self = this;

  this.errorLoadingPlaces = ko.observable(false);

  this.dialog = {
    message: ko.observable(''),
    visible: ko.observable(false)
  };

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
    try {
      const places = await loadPlaces();
      this.addPlace(...places);
    } catch(e) {
      this.errorLoadingPlaces(true);
      if(e.name == 'PlacesLoadingException') {
        mdlDialog.show('Error while loading places list, you can try reload it with button in sidebar.');
      } else {
        mdlDialog.show('Unknown error happened');
        console.error(e.message, e);
      }
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

  this.closeDialog = function(e) {
    this.dialog.visible(false);
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