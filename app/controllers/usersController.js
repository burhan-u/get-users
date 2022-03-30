const fetchUsers = require('../repository/fetchUsers');
const usersService = require('../services/usersService');

const getUsers = async (req, res) => {
  /* const users = await usersService(fetchUsers);
  return res.status(200).json(users); */

  try {
    const users = await usersService(fetchUsers);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getUsers;
