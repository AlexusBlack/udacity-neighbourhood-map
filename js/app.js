const model = new AppModel();
ko.applyBindings(model);

model.filter.subscribe((searchString) => {
  // saving our search string to localStorage
  localStorage.searchString = searchString;
});

const request = async () => {
  const response = await fetch('./places.json');

  if (response.status !== 200) {
    console.error('Looks like there was a problem with loading places list. Status Code: ' +
      response.status);
      // TODO: show snackbar
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