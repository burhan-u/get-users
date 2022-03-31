const ExternalApiError = require('../errors/externalApiError');
const fetchUsers = require('../repository/fetchUsers');
const usersService = require('../services/usersService');

const getCity = (city) => {
  const defaultCity = 'London';
  const re = /^[a-zA-Z]+$/;
  if (city && re.test(city)) {
    const capitalisedCity = city.charAt(0).toUpperCase() + city.slice(1);
    return capitalisedCity;
  }
  return defaultCity;
};

const getUsers = async (req, res) => {
  const city = getCity(req.params.city);
  try {
    const users = await usersService.getUsers(fetchUsers, city);
    return res.status(200).json(users);
  } catch (error) {
    if (error instanceof ExternalApiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(400).json({ message: `Unable to get location of city: ${city}` });
  }
};

module.exports = getUsers;
