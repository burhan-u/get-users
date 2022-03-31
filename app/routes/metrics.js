const router = require('express').Router();
const client = require('prom-client');

const register = new client.Registry();

client.collectDefaultMetrics({
  app: 'get-users-app',
  prefix: 'node_',
  timeout: 10000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
  register,
});

router.get('/', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

module.exports = router;
