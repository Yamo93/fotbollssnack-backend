const express = require("express");
const router = express.Router();
const usersControllers = require('../controllers/users');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', usersControllers.registerUser);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", usersControllers.loginUser);

module.exports = router;