const axios = require('axios');

const baseUrl = process.env.USERS_REPOSITORY_URL;

const fetchAllUsers = () => axios.get(`${baseUrl}/users`)
  .then((response) => response.data)
  .catch(() => {
    throw new Error('Error received from API');
  });

module.exports = fetchAllUsers;
