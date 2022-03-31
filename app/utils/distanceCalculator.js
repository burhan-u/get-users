const haversine = require('haversine');
const cityMap = require('city-lat-long-map');

const distanceFromCity = (location, city) => {
  const cityLocation = {
    latitude: cityMap[city].lat,
    longitude: cityMap[city].lng,
  };
  return haversine(location, cityLocation, { unit: 'mile' });
};

module.exports = distanceFromCity;
