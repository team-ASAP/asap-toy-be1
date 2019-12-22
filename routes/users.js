const express = require('express');
const router = express.Router();
const User = require('../model/user');
const dormantUser = require('../model/dormantUser');
const withdrawalUser = require('../model/withdrawalUser');
const util = require('../util');

//아이디로 회원 찾기
router.get('/find-id/:id', (req, res, next) => {
  User.find({name : req.params.name }, (err, user) =>{
    res.json({ user: user });
  });
});

module.exports = router;