const getUsers = require('../../app/controllers/usersController');
const usersService = require('../../app/services/usersService');

jest.mock('../../app/services/usersService');

describe('usersContoller', () => {
  const mockRequest = () => {};
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  let req;
  let res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should return with 200 status code', async () => {
    usersService.mockResolvedValue([]);
    const response = await getUsers(req, res);

    expect(response.status).toBeCalledWith(200);
  });

  it('should return an array if there are no users', async () => {
    usersService.mockResolvedValue([]);
    const response = await getUsers(req, res);

    expect(response.json).toBeCalledWith([]);
  });

  it('should return an error message and status 500 if usersService throws an error', async () => {
    usersService.mockImplementation(() => {
      throw new Error('Error received from API');
    });
    const errorResponse = { message: 'Error received from API' };
    const response = await getUsers(req, res);

    expect(response.status).toBeCalledWith(500);
    expect(response.json).toBeCalledWith(errorResponse);
  });
});
