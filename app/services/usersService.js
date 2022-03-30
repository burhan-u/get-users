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
  // eslint-disable-next-line no-useless-catch
  try {
    const allUsers = await repository.fetchAllUsers();
    const londonUsers = await repository.fetchLondonUsers();
    return allUsers.concat(londonUsers);
  } catch (error) {
    throw error;
  }
};

module.exports = { getUsers, getUsersWithinMilesRadius, mergeUsers };
