import mdlDialog from '../utils/mdl-dialog';

/**
 * Knockout.js binding for Google Map settings
 * 
 * @export
 * @returns 
 */
export default function mapSettings() {
  return {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      // Unwrapping map data
      const settings = ko.utils.unwrapObservable(valueAccessor());
  
      const initialize = () => element.googleMap = new google.maps.Map(element, settings);
      const error = () => {
        mdlDialog.show('Google Map api is unavailable, please check your internet connection.');
      };

      if(typeof(google) != 'undefined') {
        google.maps.event.addDomListener(window, 'load', () => initialize());
      }
      if(document.mapsLoadError) error();

      document.addEventListener('MapsReadyEvent', initialize);
      document.addEventListener('MapsLoadErrorEvent', error);
    }
  };
};