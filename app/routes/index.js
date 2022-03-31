const router = require('express').Router();
const healthcheck = require('express-healthcheck');
const usersRoute = require('./users');
const apiRoute = require('./api');
const notFound = require('./notFound');

router.use('/users', usersRoute);
router.use('/api', apiRoute);
router.use('/healthcheck', healthcheck());
router.use(notFound);

module.exports = router;
