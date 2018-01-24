/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_model__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__custom_bindings_map_settings__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__custom_bindings_map_markers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_tools__ = __webpack_require__(4);





const model = new __WEBPACK_IMPORTED_MODULE_0__app_model__["a" /* default */]();
ko.bindingHandlers.mapSettings = Object(__WEBPACK_IMPORTED_MODULE_1__custom_bindings_map_settings__["a" /* default */])();
ko.bindingHandlers.mapMarkers = Object(__WEBPACK_IMPORTED_MODULE_2__custom_bindings_map_markers__["a" /* default */])();
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
    Object(__WEBPACK_IMPORTED_MODULE_3__utils_tools__["c" /* showSnackbar */])('Looks like there was a problem with loading places list. Status Code: ' + response.status);
    return;
  }

  const placesList = await response.json();
  model.addPlace(...placesList);
}

loadPlaces();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = AppModel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_filters__ = __webpack_require__(2);


function AppModel() {
  let self = this;

  this.errorLoadingPlaces = ko.observable(false);

  this.map = ko.observable({
    center: {lat: -37.821410, lng: 144.959343},
    zoom: 15
  });

  this.filter = ko.observable(localStorage.searchString || '');
  this.filter.subscribe((searchString) => {
    // saving our search string to localStorage
    localStorage.searchString = searchString;
  });

  this.places = ko.observableArray([]);

  this.filteredPlaces = ko.computed(() => {
    if(!self.filter()) {
      return self.places(); 
    }
    return ko.utils.arrayFilter(
      self.places(), 
      (place) => Object(__WEBPACK_IMPORTED_MODULE_0__utils_filters__["a" /* default */])(place, self.filter())
    );
  });

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

  this.selectPlace = function(e) {
    this.active(true);
  }

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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filterPlaceBySearchString;
function filterPlaceBySearchString(place, searchString) {
  const name = place.name.toLowerCase();
  const category = place.category.toLowerCase();
  const search = searchString.toLowerCase();
  
  if(name.indexOf(search) != -1) {
    return true;
  } else if(category.indexOf(search) != -1) {
    return true;
  }
  return false;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mapSettings;
function mapSettings() {
  return {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      // Unwrapping map data
      let settings = ko.utils.unwrapObservable(valueAccessor());
  
      let initialize = () => element.googleMap = new google.maps.Map(element, settings);
      if(typeof(google) == 'undefined') {
        console.error('google map unavailable');
        return;
      }
      google.maps.event.addDomListener(window, 'load',  initialize);
    }
  };
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clearMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return showSnackbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createMarker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foursquare_api__ = __webpack_require__(6);




function clearMap(map) {
  if(!(map.markers == null)) {
    for(let marker of map.markers) {
      // closing info windows if open
      if(!(marker.infoWindow == null)) {
        marker.infoWindow.close();
      }
      // removing marker
      marker.setMap(null);
    }
  }
  // cleaning markers storage
  map.markers = [];
}

function getPlaceIcon(place) {
  if(place.category == 'groceries') {
    return './img/shop-icon.svg';
  } else if(place.category == 'geeks') {
    return './img/geek-icon.svg';
  } else if(place.category == 'restorant') {
    return './img/restaurant-icon.svg';
  }
}

function showSnackbar(message, timeout = -1) {
  if(timeout == -1) timeout = 2000;
  const snackbarContainer = document.getElementById('snackbar-container');
  const data = {
    message: message,
    timeout: timeout
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

function createMarker(place) {
  let marker = new google.maps.Marker({
    position: place.location,
    map: null,
    title: place.name,
    icon: getPlaceIcon(place)
  });

  place.active.subscribe((active) => {
    if(active) {
      showInfoWindow(place);
    } else {
      closeInfoWindow(place);
    }
  });

  marker.addListener('click', () => place.active(true));

  return marker;
}

function createInfoWindow(place) {
  const infoWindow = new google.maps.InfoWindow({
    content: `<b>${place.name}</b><br><br>Loading...`
  });

  Object(__WEBPACK_IMPORTED_MODULE_0__foursquare_api__["a" /* default */])(place).then(
    (info) => {
      let content = `<b>${place.name}</b><br><br>`;

      if(info == null) {
        content += `<i>Load error</i>`;
      } else {
        if(!(info.address == null)) content += `${info.address}<br>`;
        if(!(info.city == null)) content += `${info.city}<br>`;
        if(!(info.phone == null)) content += `<a href='tel:${info.phone}'>${info.formattedPhone}</a>`;
      }
      
      infoWindow.setContent(content);
    }
  );

  return infoWindow;
}

function showInfoWindow(place) {
  if(place.marker.infoWindow == null) {
    place.marker.infoWindow = createInfoWindow(place);
  }

  place.marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(() => {
    place.marker.setAnimation(null);
  }, 750);

  place.marker.infoWindow.open(place.marker.map, place.marker);
}

function closeInfoWindow(place) {
  place.marker.infoWindow.close();
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mapMarkers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_tools__ = __webpack_require__(4);


function mapMarkers() {
  return {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      let map = element;
      // Unwrapping markers list
      let placesList = ko.utils.unwrapObservable(valueAccessor());
  
      let createMarkers = () => {
        // Cleaning old markers
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_tools__["a" /* clearMap */])(map);
  
        for(let place of placesList) {
          if(place.marker == null) {
            place.marker = Object(__WEBPACK_IMPORTED_MODULE_0__utils_tools__["b" /* createMarker */])(place);
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

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getFoursquareData;
const FOURSQUARE_CLIENT_ID = '1TJBD0BFMGT5FJFTNVLRZSP2PLEMDOC0GOFQAJ3NGDY0TTB5';
const FOURSQUARE_CLIENT_SECRET = '3NAQ2TJEZ2ZAWHMZ1BKSVQ00WKA325VCADGWQZ2N1WC1BETZ';

async function getFoursquareData(place) {
  let response
  try {
    response = await fetch(`https://api.foursquare.com/v2/venues/search?` + 
      `ll=${place.location.lat},${place.location.lng}&query=${place.name}&` +
      `client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&v=20180122`);
  } catch(e) {
    showSnackbar('Unable to access foursquare ' + e.message);
    return;
  }
  
  if (response.status !== 200) {
    showSnackbar('Looks like there was a problem with loading foursquare info. Status Code: ' + response.status);
    return;
  }
  
  const data = await response.json();
  const placeData = data.response.venues[0];
  const info = {
    address: placeData.location.address,
    city: placeData.location.city,
    phone: placeData.contact.phone,
    formattedPhone: placeData.contact.formattedPhone
  };
  return info;
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map