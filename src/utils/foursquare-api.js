import FoursquareLoadingException from '../exceptions/foursquare-loading-exception';

const FOURSQUARE_CLIENT_ID = '1TJBD0BFMGT5FJFTNVLRZSP2PLEMDOC0GOFQAJ3NGDY0TTB5';
const FOURSQUARE_CLIENT_SECRET = '3NAQ2TJEZ2ZAWHMZ1BKSVQ00WKA325VCADGWQZ2N1WC1BETZ';

/**
 * Gets info about place from Foursquare API
 * 
 * @export
 * @param {place} place 
 * @returns Object with info including address, city, phone and formatted phone
 */
export default async function getFoursquareData(place) {
  let response
  try {
    response = await fetch(`https://api.foursquare.com/v2/venues/search?` + 
      `ll=${place.location.lat},${place.location.lng}&query=${place.name}&` +
      `client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&v=20180122`);
  } catch(e) {
    throw new FoursquareLoadingException('Unable to access foursquare ' + e.message);
  }
  
  if (response.status !== 200) {
    throw new FoursquareLoadingException('Looks like there was a problem with loading foursquare info. Status Code: ' + response.status);
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