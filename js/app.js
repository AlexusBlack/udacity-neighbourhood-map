const FOURSQUARE_CLIENT_ID = '1TJBD0BFMGT5FJFTNVLRZSP2PLEMDOC0GOFQAJ3NGDY0TTB5';
const FOURSQUARE_CLIENT_SECRET = '3NAQ2TJEZ2ZAWHMZ1BKSVQ00WKA325VCADGWQZ2N1WC1BETZ';

const model = new AppModel();
ko.applyBindings(model);

model.filter.subscribe((searchString) => {
  // saving our search string to localStorage
  localStorage.searchString = searchString;
});

const request = async () => {
  const response = await fetch('./places.json');

  if (response.status !== 200) {
    showSnackbar('Looks like there was a problem with loading places list. Status Code: ' + response.status);
    return;
  }

  const placesList = await response.json();

  for(let placeData of placesList) {
    let place = {
      name: placeData.name,
      location: placeData.location,
      category: placeData.category,
      active: ko.observable(false)
    };

    place.active.subscribe((active) => {
      if(active) {
        showInfoWindow(place);
      } else {
        closeInfoWindow(place);
      }
    });

    model.places.push(place);
  }
}

request();