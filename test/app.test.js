const supertest = require('supertest');
const app = require('../app/app');

const request = supertest(app);

describe('app', () => {
  it('should return 200 on users route', async () => {
    const res = await request.get('/users');
    expect(res.status).toBe(200);
  });

  it('should return 404 on undefined route', async () => {
    const res = await request.get('/undefined');
    expect(res.status).toBe(404);
  });
});
