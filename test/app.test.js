const supertest = require('supertest');
const app = require('../app/app');

const request = supertest(app);

describe('app', () => {
  it('should return 200 on users route', async () => {
    const res = await request.get('/users');
    expect(res.status).toBe(200);
  });

  it('should return 200 on users route with city param', async () => {
    const res = await request.get('/users/london');
    expect(res.status).toBe(200);
  });

  it('should return 404 on undefined route', async () => {
    const res = await request.get('/undefined');
    expect(res.status).toBe(404);
  });

  it('should return 200 on healthcheck route', async () => {
    const res = await request.get('/healthcheck');
    expect(res.status).toBe(200);
  });

  it('should return an object with uptime on healthcheck route', async () => {
    const res = await request.get('/healthcheck');
    expect(res.body.uptime).toBeDefined();
  });

  it('should return 200 on metrics route', async () => {
    const res = await request.get('/metrics');
    expect(res.status).toBe(200);
  });
});
