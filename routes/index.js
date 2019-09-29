const express = require('express');
const router = express.Router();
const User = require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:name', (req, res, next) => {
  User.find({name : req.params.name }, (err, user) =>{
    res.json({ user: user });
  });
});

module.exports = router;
