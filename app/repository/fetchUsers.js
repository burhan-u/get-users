const axios = require('axios');
const { logger } = require('../utils/logger');

const baseUrl = process.env.USERS_REPOSITORY_URL;

const fetchUsers = (endpoint) => axios.get(`${baseUrl}/${endpoint}`)
  .then((response) => {
    logger.info('Successfully called external API');
    return response.data;
  })
  .catch(() => {
    logger.error('Error received from external API');
    throw new Error('Error received from API');
  });

const fetchAllUsers = () => fetchUsers('users');
const fetchLondonUsers = () => fetchUsers('city/London/users');

module.exports = { fetchAllUsers, fetchLondonUsers };
