const getUsers = require('../../app/services/usersService');

describe('usersService', () => {
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      fetchAllUsers: jest.fn().mockResolvedValue([{ a: 'a' }]),
      fetchLondonUsers: jest.fn().mockResolvedValue([{ b: 'b' }]),
    };
  });

  it('should call fetchAllUsers', async () => {
    await getUsers(mockRepository);

    expect(mockRepository.fetchAllUsers).toHaveBeenCalledTimes(1);
  });

  it('should call fetchLondonUsers', async () => {
    await getUsers(mockRepository);

    expect(mockRepository.fetchLondonUsers).toHaveBeenCalledTimes(1);
  });

  it('should catch errors thrown by external api', async () => {
    const mockRepositoryRejected = {
      fetchAllUsers: jest.fn().mockImplementation(() => {
        throw new Error('Error received from API');
      }),
      fetchLondonUsers: jest.fn().mockResolvedValue([{ b: 'b' }]),
    };

    expect.assertions(2);
    try {
      await getUsers(mockRepositoryRejected);
    } catch (error) {
      expect(mockRepositoryRejected.fetchLondonUsers).toHaveBeenCalledTimes(0);
      expect(error.message).toEqual('Error received from API');
    }
  });
});
