const distanceFromLondon = require('../utils/distanceCalculator');

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

module.exports = { getUsers, getUsersWithinMilesRadius };
