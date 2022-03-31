const router = require('express').Router();
const getUsers = require('../controllers/usersController');

router.get('/:city?', getUsers);

module.exports = router;
