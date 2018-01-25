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
      let settings = ko.utils.unwrapObservable(valueAccessor());
  
      let initialize = () => element.googleMap = new google.maps.Map(element, settings);
      if(typeof(google) == 'undefined') {
        mdlDialog.show('Google Map api is unavailable, please check your internet connection.');
        return;
      }
      google.maps.event.addDomListener(window, 'load',  initialize);
    }
  };
};