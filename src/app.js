import 'dialog-polyfill/dialog-polyfill.css';
import '../css/styles.css';

import AppModel from './app-model';
import mapSettingsBinding from './custom-bindings/map-settings';
import mapMarkersBinding from './custom-bindings/map-markers';

const model = new AppModel();
ko.bindingHandlers.mapSettings = mapSettingsBinding();
ko.bindingHandlers.mapMarkers = mapMarkersBinding();
ko.applyBindings(model);

model.loadPlaces();

