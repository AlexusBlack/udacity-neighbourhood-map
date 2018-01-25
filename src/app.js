import 'babel-polyfill';
import 'dialog-polyfill/dialog-polyfill.css';
import '../css/styles.css';

import AppModel from './app-model';
import mapSettingsBinding from './custom-bindings/map-settings';
import mapMarkersBinding from './custom-bindings/map-markers';

// Loading custom bindings for Google Maps
ko.bindingHandlers.mapSettings = mapSettingsBinding();
ko.bindingHandlers.mapMarkers = mapMarkersBinding();

// Initializing model and applying it
const model = new AppModel();
ko.applyBindings(model);

// Loading places from JSON
model.loadPlaces();

