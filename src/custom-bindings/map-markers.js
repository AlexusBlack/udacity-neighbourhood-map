import { clearMap, createMarker } from '../utils/tools';
import mdlDialog from '../utils/mdl-dialog';

/**
 * Knockout.js for data binding of places to google maps markers
 * 
 * @export
 * @returns 
 */
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
      
      if(typeof(google) != 'undefined') {
        google.maps.event.addDomListener(window, 'load', () => createMarkers());
      }
      document.addEventListener('MapsReadyEvent', createMarkers);
    }
  };
}