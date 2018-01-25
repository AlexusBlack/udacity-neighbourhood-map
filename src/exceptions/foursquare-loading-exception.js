/**
 * Happens when we were unable to load data from Foursquare
 * 
 * @export
 * @param {String} message 
 */
export default function FoursquareLoadingException(message) {
  this.message = message;
  this.name = 'FoursquareLoadingException';
}