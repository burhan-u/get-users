const axios = require('axios');
const { fetchAllUsers, fetchLondonUsers } = require('../../app/repository/fetchUsers');

jest.mock('axios');

describe('fetch all users data from external api', () => {
  const mockResponseAllUsers = [
    {
      id: 266,
      first_name: 'Ancell',
      last_name: 'Garnsworthy',
      email: 'agarnsworthy7d@seattletimes.com',
      ip_address: '67.4.69.137',
      latitude: 51.6553959,
      longitude: 0.0572553,
    },
    {
      id: 123,
      first_name: 'Katee',
      last_name: 'Gopsall',
      email: 'kgopsallm1@cam.ac.uk',
      ip_address: '1.1.1.1',
      latitude: 5.7204203,
      longitude: 10.901604,
    },
  ];

  it('sends a request to the correct url', async () => {
    const url = 'https://bpdts-test-app.herokuapp.com/users';
    axios.get.mockResolvedValueOnce({});
    await fetchAllUsers();

    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('should return an object with user data', async () => {
    axios.get.mockResolvedValueOnce({ data: mockResponseAllUsers });
    const res = await fetchAllUsers();

    expect(res).toEqual(mockResponseAllUsers);
  });

  it('it should throw an error if the server returns with an error', async () => {
    const errorResponse = { status: 500 };
    axios.get.mockRejectedValueOnce(errorResponse);

    expect.assertions(1);
    try {
      await fetchAllUsers();
    } catch (error) {
      expect(error.message).toEqual('Error received from API');
    }
  });
});

describe('fetch users living in london from external api', () => {
  const mockResponseLondonUsers = [{
    id: 123,
    first_name: 'Katee',
    last_name: 'Gopsall',
    email: 'kgopsallm1@cam.ac.uk',
    ip_address: '1.1.1.1',
    latitude: 5.7204203,
    longitude: 10.901604,
  }];

  it('sends a request to the correct url', async () => {
    const url = 'https://bpdts-test-app.herokuapp.com/city/London/users';
    axios.get.mockResolvedValueOnce({});
    await fetchLondonUsers();

    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('should return an object with user data', async () => {
    axios.get.mockResolvedValueOnce({ data: mockResponseLondonUsers });
    const res = await fetchLondonUsers();

    expect(res).toEqual(mockResponseLondonUsers);
  });

  it('it should throw an error if the server returns with an error', async () => {
    const errorResponse = { status: 500 };
    axios.get.mockRejectedValueOnce(errorResponse);

    expect.assertions(1);
    try {
      await fetchLondonUsers();
    } catch (error) {
      expect(error.message).toEqual('Error received from API');
    }
  });
});
