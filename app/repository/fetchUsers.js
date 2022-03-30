const axios = require('axios');

const baseUrl = process.env.USERS_REPOSITORY_URL;

const fetchAllUsers = () => axios.get(`${baseUrl}/users`)
  .then((response) => response.data)
  .catch(() => {
    throw new Error('Error received from API');
  });

const fetchLondonUsers = () => axios.get(`${baseUrl}/city/London/users`)
  .then((response) => response.data)
  .catch(() => {
    throw new Error('Error received from API');
  });

module.exports = { fetchAllUsers, fetchLondonUsers };
