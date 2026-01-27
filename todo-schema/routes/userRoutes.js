const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateSignup } = require('../middleware/validation');

router.post('/signup', validateSignup, userController.signup);

module.exports = router;
