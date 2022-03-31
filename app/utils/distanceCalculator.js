const haversine = require('haversine');

const { LONDON_LAT } = process.env;
const { LONDON_LONG } = process.env;

const distanceFromLondon = (location) => {
  const londonLocation = {
    latitude: LONDON_LAT,
    longitude: LONDON_LONG,
  };
  return haversine(location, londonLocation, { unit: 'mile' });
};

module.exports = distanceFromLondon;
