const fetchUsers = require('../repository/fetchUsers');
const usersService = require('../services/usersService');

const getUsers = async (req, res) => {
  try {
    const users = await usersService.getUsers(fetchUsers);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getUsers;
