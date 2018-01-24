import AppModel from './app-model';
import mapSettingsBinding from './custom-bindings/map-settings';
import mapMarkersBinding from './custom-bindings/map-markers';
import {loadPlaces, showSnackbar, showInfoWindow, closeInfoWindow} from './utils/tools';

const model = new AppModel();
ko.bindingHandlers.mapSettings = mapSettingsBinding();
ko.bindingHandlers.mapMarkers = mapMarkersBinding();
ko.applyBindings(model);

model.loadPlaces();

