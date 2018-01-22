const model = new AppModel();
ko.applyBindings(model);

model.filter.subscribe((searchString) => {
  // saving our search string to localStorage
  localStorage.searchString = searchString;
});

// Loading places list
fetch('./places.json').then((response) => {
  if (response.status !== 200) {
    console.error('Looks like there was a problem with loading places list. Status Code: ' +
      response.status);
      // TODO: show snackbar
    return;
  }

  response.json().then((data) => {
    for(let place of data) {
      model.places.push({
        name: place.name,
        location: place.location,
        category: place.category,
        active: ko.observable(false)
      });
    }
    // model.places.push(...data);
  });
});