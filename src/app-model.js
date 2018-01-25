import filterPlaceBySearchString from './utils/filters';
import { loadPlaces } from './utils/tools';
import mdlDialog from './utils/mdl-dialog';

/**
 * View\Data Model of our app
 * 
 * @export
 */
export default function AppModel() {
  let self = this;

  // If we cannot load places this is critical error that we must reflect in model
  this.errorLoadingPlaces = ko.observable(false);

  // Initial settings for map
  this.map = ko.observable({
    center: {lat: -37.821410, lng: 144.959343},
    zoom: 15
  });

  // Filter, default value comes from localStorage or it is empty
  this.filter = ko.observable(localStorage.searchString || '');
  this.filter.subscribe((searchString) => {
    // Saving our search string to localStorage
    localStorage.searchString = searchString;
  });

  // Our list of place
  this.places = ko.observableArray([]);

  // List of places, filtered
  this.filteredPlaces = ko.computed(() => {
    if(!self.filter()) {
      return self.places(); 
    }
    return ko.utils.arrayFilter(
      self.places(), 
      (place) => filterPlaceBySearchString(place, self.filter())
    );
  });

  /**
   * Load list of places
   */
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

  /**
   * Add one or multiple places
   * @param {*} placesInfo 
   */
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

  /**
   * Click handler to activate place
   * @param {place} e 
   */
  this.selectPlace = function(e) {
    this.active(true);
  }

  /**
   * When place becomes active, we are making every other inactive
   * 
   * @param {place} changedPlace 
   * @param {Boolean} state 
   * @returns 
   */
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