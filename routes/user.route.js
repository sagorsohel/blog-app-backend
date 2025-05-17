const {Router} = require('express');
const router = Router();

const User = require('../models/user.model');
const signUp = require('../controllers/user.controller');

router.post('/register', signUp);

module.exports = router;

