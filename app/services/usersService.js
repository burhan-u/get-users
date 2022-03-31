const array = require('lodash/array');
const distanceFromCity = require('../utils/distanceCalculator');

const mergeUsers = (arr1, arr2) => array.uniqBy([...arr1, ...arr2], 'id');

// eslint-disable-next-line arrow-body-style
const getUsersWithinMilesRadius = (users, city, milesRadius) => {
  return users.filter((user) => {
    const location = (({ latitude, longitude }) => ({ latitude, longitude }))(user);
    return distanceFromCity(location, city) <= milesRadius;
  });
};

const getUsers = async (repository, city) => {
  if (city === null || city === undefined) {
    // eslint-disable-next-line no-param-reassign
    city = 'London';
  }
  const { MILES_RADIUS } = process.env;
  // eslint-disable-next-line no-useless-catch
  try {
    const allUsers = await repository.fetchAllUsers();
    const usersLivingInCity = await repository.fetchCityUsers(city);
    const usersCurrentlyInCity = getUsersWithinMilesRadius(allUsers, city, MILES_RADIUS);
    return mergeUsers(usersCurrentlyInCity, usersLivingInCity);
  } catch (error) {
    throw error;
  }
};

module.exports = { getUsers, getUsersWithinMilesRadius, mergeUsers };
