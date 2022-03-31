const fetchUsers = require('../repository/fetchUsers');
const usersService = require('../services/usersService');

const getCity = (city) => {
  const re = /^[a-zA-Z]+$/;
  if (city && re.test(city)) {
    const capitalisedCity = city.charAt(0).toUpperCase() + city.slice(1);
    return capitalisedCity;
  }
  return 'London';
};

const getUsers = async (req, res) => {
  const city = getCity(req.params.city);
  try {
    const users = await usersService.getUsers(fetchUsers, city);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getUsers;
