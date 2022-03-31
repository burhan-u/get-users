const array = require('lodash/array');
const distanceFromLondon = require('../utils/distanceCalculator');

const mergeUsers = (arr1, arr2) => array.uniqBy([...arr1, ...arr2], 'id');

// eslint-disable-next-line arrow-body-style
const getUsersWithinMilesRadius = (users, milesRadius) => {
  return users.filter((user) => {
    const location = (({ latitude, longitude }) => ({ latitude, longitude }))(user);
    return distanceFromLondon(location) <= milesRadius;
  });
};

const getUsers = async (repository) => {
  const { MILES_RADIUS } = process.env;
  // eslint-disable-next-line no-useless-catch
  try {
    const allUsers = await repository.fetchAllUsers();
    const usersLivingInLondon = await repository.fetchLondonUsers();
    const usersCurrentlyInLondon = getUsersWithinMilesRadius(allUsers, MILES_RADIUS);
    return mergeUsers(usersCurrentlyInLondon, usersLivingInLondon);
  } catch (error) {
    throw error;
  }
};

module.exports = { getUsers, getUsersWithinMilesRadius, mergeUsers };
