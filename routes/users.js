const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const usersControllers = require('../controllers/users');

// @route POST api/users/register
// @desc Register user
// @access Public
// Sanitisering av inputs
router.post('/register', [
    body('name')
        .not().isEmpty()
        .trim()
        .escape(),
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('password')
        .not().isEmpty()
        .trim()
        .escape(),
    body('nickname')
        .not().isEmpty()
        .trim()
        .escape(),
    body('favoriteclub')
        .trim()
        .escape()
], usersControllers.registerUser);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
// Sanitisering av inputs
router.post("/login", [
    body('email')
        .escape(),
    body('password')
        .trim()
        .escape()
], usersControllers.loginUser);

// @route GET api/users/getuserinfo/:userId
// @desc Get public user info
// @access Public
router.get("/getuserinfo/:userId", usersControllers.getUserInfoById);

module.exports = router;