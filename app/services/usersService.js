const getUsers = async (repository) => {
  const allUsers = await repository.fetchAllUsers();
  const londonUsers = await repository.fetchLondonUsers();
  return allUsers.concat(londonUsers);
};

module.exports = getUsers;
