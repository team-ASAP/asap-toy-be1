const express = require('express');
const router = express.Router();
const User = require('../model/user');
const util = require('../util');
const jwt = require('jsonwebtoken');
const confJWT = require('../config').JWT;

router.post('/login', (req, res, next) => {

});

router.get('/me', (req, res, next) => {

});

router.get('/refresh', (req, res, next) => {
  
});

module.exports = router;
