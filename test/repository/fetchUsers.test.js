const axios = require('axios');
const fetchAllUsers = require('../../app/repository/fetchUsers');

jest.mock('axios');

describe('fetch all users data from external api', () => {
  it('sends a request to the correct url', async () => {
    const url = 'https://bpdts-test-app.herokuapp.com/users';
    axios.get.mockResolvedValueOnce({});
    await fetchAllUsers();

    expect(axios.get).toHaveBeenCalledWith(url);
  });
});
