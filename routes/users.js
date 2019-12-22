const express = require('express');
const router = express.Router();
const User = require('../model/user');
const dormantUser = require('../model/dormantUser');
const withdrawalUser = require('../model/withdrawalUser');
const util = require('../util');

<<<<<<< HEAD

/**
 * @swagger
 * /user/:name:
 *   get:
 *     summary: 사용자 정보 가져오기
 *     tags: [User]
 */
router.get('/:name', (req, res, next) => {
  User.find({name : req.params.name }, (err, user) =>{
=======
// name -> id
router.get('/:id', (req, res, next) => {
  User.find({id : req.params.id }, (err, user) =>{
>>>>>>> 650f53c42f659b0ed4ec840828a3824106ff448c
    res.json({ user: user });
  });
});

<<<<<<< HEAD

/**
 * @swagger
 * /user/join/:name/:passwd:
 *  post:
 *    summary: 가입
 *    tags: [User]
 */
router.post('/join/:name/:passwd', (req, res, next) => {
=======
// name -> id
router.post('/join/:id/:passwd', (req, res, next) => {
>>>>>>> 650f53c42f659b0ed4ec840828a3824106ff448c
  const user = new User();
  user.id = req.params.id;
  user.passwd = req.params.passwd;

  user.save(err =>{
    if(err){
      console.error(err);
<<<<<<< HEAD
      res.send("FAILURE");
      return;
    }
    res.send("SUCCESS");
=======
      res.send("SUCCESS");
      return;
    }
    res.send("FAILURE");
>>>>>>> 650f53c42f659b0ed4ec840828a3824106ff448c
  });
});

module.exports = router;
