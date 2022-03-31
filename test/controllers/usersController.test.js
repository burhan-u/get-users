const getUsersController = require('../../app/controllers/usersController');
const ExternalApiError = require('../../app/errors/externalApiError');
const usersService = require('../../app/services/usersService');

jest.mock('../../app/services/usersService');

describe('usersContoller', () => {
  const mockRequest = { params: { city: 'city' } };
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  let req;
  let res;

  beforeEach(() => {
    req = mockRequest;
    res = mockResponse();
  });

  it('should return with 200 status code', async () => {
    usersService.getUsers.mockResolvedValue([]);
    const response = await getUsersController(req, res);

    expect(response.status).toBeCalledWith(200);
  });

  it('should return an array if there are no users', async () => {
    usersService.getUsers.mockResolvedValue([]);
    const response = await getUsersController(req, res);

    expect(response.json).toBeCalledWith([]);
  });

  it('should return an error message and status 500 if usersService throws an external api error', async () => {
    usersService.getUsers.mockImplementation(() => {
      throw new ExternalApiError('Error received from external API', 500);
    });
    const errorResponse = { message: 'Error received from external API' };
    const response = await getUsersController(req, res);

    expect(response.status).toBeCalledWith(500);
    expect(response.json).toBeCalledWith(errorResponse);
  });

  it('should return an error message and status 400 if usersService throws an error', async () => {
    usersService.getUsers.mockImplementation(() => {
      throw new Error('City location error');
    });
    const errorResponse = { message: 'Unable to get location of city: City' };
    const response = await getUsersController(req, res);

    expect(response.status).toBeCalledWith(400);
    expect(response.json).toBeCalledWith(errorResponse);
  });
});
