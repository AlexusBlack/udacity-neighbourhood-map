/**
 * Check if provided place match provided search string
 * 
 * @export
 * @param {place} place 
 * @param {String} searchString 
 * @returns {Boolean} True if place matches
 */
export default function filterPlaceBySearchString(place, searchString) {
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