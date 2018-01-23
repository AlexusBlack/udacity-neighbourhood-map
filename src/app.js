import AppModel from './app-model';
import mapSettingsBinding from './custom-bindings/map-settings';
import mapMarkersBinding from './custom-bindings/map-markers';
import {showSnackbar, showInfoWindow, closeInfoWindow} from './utils/tools';

const model = new AppModel();
ko.bindingHandlers.mapSettings = mapSettingsBinding();
ko.bindingHandlers.mapMarkers = mapMarkersBinding();
ko.applyBindings(model);

const loadPlaces = async () => {
  model.errorLoadingPlaces(false);
  let response;
  try {
    response = await fetch('./places.json');
  } catch(e) {
    console.error('Looks like there was a problem with loading places list.' + e.message);
    alert('We were unable to load places list, please try to reload it with button in sidebar');
    model.errorLoadingPlaces(true);
    return;
  }

  if (response.status !== 200) {
    showSnackbar('Looks like there was a problem with loading places list. Status Code: ' + response.status);
    return;
  }

  const placesList = await response.json();
  model.addPlace(...placesList);

  // for(let placeData of placesList) {
  //   let place = {
  //     name: placeData.name,
  //     location: placeData.location,
  //     category: placeData.category,
  //     active: ko.observable(false)
  //   };

  //   place.active.subscribe((active) => {
  //     if(active) {
  //       showInfoWindow(place);
  //     } else {
  //       closeInfoWindow(place);
  //     }
  //   });

  //   model.places.push(place);
  // }
}

loadPlaces();