const getUsers = require('../../app/services/usersService');

describe('usersContoller', () => {
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      fetchAllUsers: jest.fn().mockResolvedValue([{ a: 'a' }]),
      fetchLondonUsers: jest.fn().mockResolvedValue([{ b: 'b' }]),
    };
  });

  it('should call fetchAllUsers', async () => {
    await getUsers(mockRepository);

    expect(mockRepository.fetchAllUsers).toBeCalledTimes(1);
  });

  it('should call fetchLondonUsers', async () => {
    await getUsers(mockRepository);

    expect(mockRepository.fetchLondonUsers).toBeCalledTimes(1);
  });
});
