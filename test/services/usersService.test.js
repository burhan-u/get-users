const { getUsers, getUsersWithinMilesRadius, mergeUsers } = require('../../app/services/usersService');

describe('getUsers service', () => {
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      fetchAllUsers: jest.fn().mockResolvedValue([{ a: 'a' }]),
      fetchCityUsers: jest.fn().mockResolvedValue([{ b: 'b' }]),
    };
  });

  it('should call fetchAllUsers', async () => {
    await getUsers(mockRepository);

    expect(mockRepository.fetchAllUsers).toHaveBeenCalledTimes(1);
  });

  it('should call fetchCityUsers', async () => {
    await getUsers(mockRepository);

    expect(mockRepository.fetchCityUsers).toHaveBeenCalledTimes(1);
  });

  it('should catch errors thrown by external api', async () => {
    const mockRepositoryRejected = {
      fetchAllUsers: jest.fn().mockImplementation(() => {
        throw new Error('Error received from API');
      }),
      fetchCityUsers: jest.fn().mockResolvedValue([{ b: 'b' }]),
    };

    expect.assertions(2);
    try {
      await getUsers(mockRepositoryRejected);
    } catch (error) {
      expect(mockRepositoryRejected.fetchCityUsers).toHaveBeenCalledTimes(0);
      expect(error.message).toEqual('Error received from API');
    }
  });

  it('should filter all users and return a merged list with no duplicates', async () => {
    const mockRepositoryResolved = {
      fetchAllUsers: jest.fn().mockResolvedValue([
        {
          id: 322,
          first_name: 'Hugo',
          last_name: 'Lynd',
          email: 'hlynd8x@merriam-webster.com',
          ip_address: '109.0.153.166',
          latitude: 51.6710832,
          longitude: 0.8078532,
        },
        {
          id: 554,
          first_name: 'Phyllys',
          last_name: 'Hebbs',
          email: 'phebbsfd@umn.edu',
          ip_address: '100.89.186.13',
          latitude: 51.5489435,
          longitude: 0.3860497,
        },
        {
          id: 19,
          first_name: 'Jeane',
          last_name: 'de Juares',
          email: 'jdejuaresi@exblog.jp',
          ip_address: '97.162.35.153',
          latitude: 32.6797904,
          longitude: -5.5781378,
        },
        {
          id: 20,
          first_name: 'Alard',
          last_name: 'Kacheler',
          email: 'akachelerj@google.co.uk',
          ip_address: '161.87.0.198',
          latitude: -6.9547303,
          longitude: 107.3787448,
        },
      ]),
      fetchCityUsers: jest.fn().mockResolvedValue([
        {
          id: 322,
          first_name: 'Hugo',
          last_name: 'Lynd',
          email: 'hlynd8x@merriam-webster.com',
          ip_address: '109.0.153.166',
          latitude: 51.6710832,
          longitude: 0.8078532,
        },
        {
          id: 554,
          first_name: 'Phyllys',
          last_name: 'Hebbs',
          email: 'phebbsfd@umn.edu',
          ip_address: '100.89.186.13',
          latitude: 51.5489435,
          longitude: 0.3860497,
        },
      ]),
    };
    const expected = [
      {
        id: 322,
        first_name: 'Hugo',
        last_name: 'Lynd',
        email: 'hlynd8x@merriam-webster.com',
        ip_address: '109.0.153.166',
        latitude: 51.6710832,
        longitude: 0.8078532,
      },
      {
        id: 554,
        first_name: 'Phyllys',
        last_name: 'Hebbs',
        email: 'phebbsfd@umn.edu',
        ip_address: '100.89.186.13',
        latitude: 51.5489435,
        longitude: 0.3860497,
      },
    ];
    const usersInLondon = await getUsers(mockRepositoryResolved);

    expect(usersInLondon.length).toBe(2);
    expect(usersInLondon).toEqual(expected);
  });
});

describe('getUsersWithinMilesRadius', () => {
  const city = 'London';
  const milesRadius = 50;
  const mockData = {
    allUsers: [
      {
        id: 322,
        first_name: 'Hugo',
        last_name: 'Lynd',
        email: 'hlynd8x@merriam-webster.com',
        ip_address: '109.0.153.166',
        latitude: 51.6710832,
        longitude: 0.8078532,
      },
      {
        id: 554,
        first_name: 'Phyllys',
        last_name: 'Hebbs',
        email: 'phebbsfd@umn.edu',
        ip_address: '100.89.186.13',
        latitude: 51.5489435,
        longitude: 0.3860497,
      },
      {
        id: 19,
        first_name: 'Jeane',
        last_name: 'de Juares',
        email: 'jdejuaresi@exblog.jp',
        ip_address: '97.162.35.153',
        latitude: 32.6797904,
        longitude: -5.5781378,
      },
      {
        id: 20,
        first_name: 'Alard',
        last_name: 'Kacheler',
        email: 'akachelerj@google.co.uk',
        ip_address: '161.87.0.198',
        latitude: -6.9547303,
        longitude: 107.3787448,
      },
    ],
    usersInLondon: [
      {
        id: 322,
        first_name: 'Hugo',
        last_name: 'Lynd',
        email: 'hlynd8x@merriam-webster.com',
        ip_address: '109.0.153.166',
        latitude: 51.6710832,
        longitude: 0.8078532,
      },
      {
        id: 554,
        first_name: 'Phyllys',
        last_name: 'Hebbs',
        email: 'phebbsfd@umn.edu',
        ip_address: '100.89.186.13',
        latitude: 51.5489435,
        longitude: 0.3860497,
      },
    ],
    usersNotInLondon: [
      {
        id: 19,
        first_name: 'Jeane',
        last_name: 'de Juares',
        email: 'jdejuaresi@exblog.jp',
        ip_address: '97.162.35.153',
        latitude: 32.6797904,
        longitude: -5.5781378,
      },
      {
        id: 20,
        first_name: 'Alard',
        last_name: 'Kacheler',
        email: 'akachelerj@google.co.uk',
        ip_address: '161.87.0.198',
        latitude: -6.9547303,
        longitude: 107.3787448,
      },
    ],
  };

  it('should return an array containing only users whose current location is within london', () => {
    const filteredUsers = getUsersWithinMilesRadius(mockData.allUsers, city, milesRadius);

    expect(filteredUsers).toEqual(mockData.usersInLondon);
  });

  it('should return the same array if all users are in london', () => {
    const filteredUsers = getUsersWithinMilesRadius(mockData.usersInLondon, city, milesRadius);

    expect(filteredUsers).toEqual(mockData.usersInLondon);
  });

  it('should return an empty array if there are no users in london', () => {
    const filteredUsers = getUsersWithinMilesRadius(mockData.usersNotInLondon, city, milesRadius);

    expect(filteredUsers).toEqual([]);
  });
});

describe('mergeUsers', () => {
  const mockData = {
    userArr1: [
      {
        id: 322,
        first_name: 'Hugo',
        last_name: 'Lynd',
        email: 'hlynd8x@merriam-webster.com',
        ip_address: '109.0.153.166',
        latitude: 51.6710832,
        longitude: 0.8078532,
      },
      {
        id: 554,
        first_name: 'Phyllys',
        last_name: 'Hebbs',
        email: 'phebbsfd@umn.edu',
        ip_address: '100.89.186.13',
        latitude: 51.5489435,
        longitude: 0.3860497,
      },
      {
        id: 19,
        first_name: 'Jeane',
        last_name: 'de Juares',
        email: 'jdejuaresi@exblog.jp',
        ip_address: '97.162.35.153',
        latitude: 32.6797904,
        longitude: -5.5781378,
      },
    ],
    userArr2: [
      {
        id: 554,
        first_name: 'Phyllys',
        last_name: 'Hebbs',
        email: 'phebbsfd@umn.edu',
        ip_address: '100.89.186.13',
        latitude: 51.5489435,
        longitude: 0.3860497,
      },
      {
        id: 19,
        first_name: 'Jeane',
        last_name: 'de Juares',
        email: 'jdejuaresi@exblog.jp',
        ip_address: '97.162.35.153',
        latitude: 32.6797904,
        longitude: -5.5781378,
      },
      {
        id: 20,
        first_name: 'Alard',
        last_name: 'Kacheler',
        email: 'akachelerj@google.co.uk',
        ip_address: '161.87.0.198',
        latitude: -6.9547303,
        longitude: 107.3787448,
      },
    ],
  };

  it('should return an array containing all the users in both arrays without duplicates', () => {
    const expected = [
      {
        id: 322,
        first_name: 'Hugo',
        last_name: 'Lynd',
        email: 'hlynd8x@merriam-webster.com',
        ip_address: '109.0.153.166',
        latitude: 51.6710832,
        longitude: 0.8078532,
      },
      {
        id: 554,
        first_name: 'Phyllys',
        last_name: 'Hebbs',
        email: 'phebbsfd@umn.edu',
        ip_address: '100.89.186.13',
        latitude: 51.5489435,
        longitude: 0.3860497,
      },
      {
        id: 19,
        first_name: 'Jeane',
        last_name: 'de Juares',
        email: 'jdejuaresi@exblog.jp',
        ip_address: '97.162.35.153',
        latitude: 32.6797904,
        longitude: -5.5781378,
      },
      {
        id: 20,
        first_name: 'Alard',
        last_name: 'Kacheler',
        email: 'akachelerj@google.co.uk',
        ip_address: '161.87.0.198',
        latitude: -6.9547303,
        longitude: 107.3787448,
      },
    ];
    const mergedUsers = mergeUsers(mockData.userArr1, mockData.userArr2);

    expect(mergedUsers.length).toBe(4);
    expect(mergedUsers).toEqual(expected);
  });

  it('should not create duplicate users when merging the same array', () => {
    const mergedUsers = mergeUsers(mockData.userArr1, mockData.userArr1);

    expect(mergedUsers.length).toBe(3);
    expect(mergedUsers).toEqual(mockData.userArr1);
  });

  it('should return the same array then merging with an emptiy array', () => {
    const mergedUsers = mergeUsers(mockData.userArr1, []);

    expect(mergedUsers.length).toBe(3);
    expect(mergedUsers).toEqual(mockData.userArr1);
  });

  it('should return an empty array when merging two empty arrays', () => {
    const mergedUsers = mergeUsers([], []);

    expect(mergedUsers.length).toBe(0);
    expect(mergedUsers).toEqual([]);
  });
});
