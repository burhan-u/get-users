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

module.exports = getUsers;
