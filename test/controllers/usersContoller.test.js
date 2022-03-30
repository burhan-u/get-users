const getUsers = require('../../app/controllers/usersController');

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
    const response = await getUsers(req, res);

    expect(response.status).toBeCalledWith(200);
  });

  it('should return an array if there are no users', async () => {
    const response = await getUsers(req, res);

    expect(response.json).toBeCalledWith([]);
  });
});
