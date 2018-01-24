import { clearMap, createMarker } from '../utils/tools';
import mdlDialog from './mdl-dialog';

export default function mapMarkers() {
  return {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      let map = element;
      // Unwrapping markers list
      let placesList = ko.utils.unwrapObservable(valueAccessor());
  
      let createMarkers = () => {
        // Cleaning old markers
        clearMap(map);
  
        for(let place of placesList) {
          if(place.marker == null) {
            place.marker = createMarker(place);
          }
          place.marker.setMap(map.googleMap);
          map.markers.push(place.marker);
        }
      };
      
      if (document.readyState === 'complete') {
        createMarkers();
      } else {
        if(typeof(google) == 'undefined') {
          mdlDialog.show('Google Map api is unavailable, please check your internet connection.');
          return;
        }
        google.maps.event.addDomListener(window, 'load', createMarkers);
      }
    }
  };
}