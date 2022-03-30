const fetchUsers = require('../repository/fetchUsers');
const usersService = require('../services/usersService');

const getUsers = async (req, res) => {
  const users = await usersService(fetchUsers);
  return res.status(200).json(users);
};

module.exports = getUsers;
