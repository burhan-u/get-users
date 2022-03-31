const axios = require('axios');
const { logger } = require('../utils/logger');
const ExternalApiError = require('../errors/externalApiError');

const baseUrl = process.env.USERS_REPOSITORY_URL;

const fetchUsers = (endpoint) => axios.get(`${baseUrl}/${endpoint}`)
  .then((response) => {
    logger.info('Successfully called external API');
    return response.data;
  })
  .catch(() => {
    logger.error('Error received from external API');
    throw new ExternalApiError('Error received from external API', 500);
  });

const fetchAllUsers = () => fetchUsers('users');
const fetchCityUsers = (city) => fetchUsers(`city/${city}/users`);

module.exports = { fetchAllUsers, fetchCityUsers };
