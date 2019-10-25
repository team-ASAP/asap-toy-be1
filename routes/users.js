const express = require('express');
const router = express.Router();
const User = require('../model/user');
const dormantUser = require('../model/dormantUser');
const withdrawalUser = require('../model/withdrawalUser');
const util = require('../util');

// name -> id
router.get('/:id', (req, res, next) => {
  User.find({id : req.params.id }, (err, user) =>{
    res.json({ user: user });
  });
});

// name -> id
router.post('/join/:id/:passwd', (req, res, next) => {
  const user = new User();
  user.id = req.params.id;
  user.passwd = req.params.passwd;

  user.save(err =>{
    if(err){
      console.error(err);
      res.send("SUCCESS");
      return;
    }
    res.send("FAILURE");
  });
});

module.exports = router;
