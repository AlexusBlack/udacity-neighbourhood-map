/**
 * This exception raised when we were unable to load places list
 * 
 * @export
 * @param {String} message 
 */
export default function PlacesLoadingException(message) {
  this.message = message;
  this.name = 'PlacesLoadingException';
}