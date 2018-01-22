function itemClickHandler(e) {
  if(this.active()) return;
  for(var place of model.places()) {
    if(place != this) {
      place.active(false);
    } else {
      place.active(true);
    }
  }
}