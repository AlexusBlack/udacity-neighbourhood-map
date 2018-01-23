import { clearMap, createMarker } from '../utils/tools';

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
          console.error('google map unavailable');
          return;
        }
        google.maps.event.addDomListener(window, 'load', createMarkers);
      }
    }
  };
}