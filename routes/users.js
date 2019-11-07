var express = require('express');
var router = express.Router();
const User = require('../model/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * @swagger
 * /user/:name:
 *   get:
 *     summary: 사용자 정보 가져오기
 *     tags: [User]
 */
router.get('/:name', (req, res, next) => {
  User.find({name : req.params.name }, (err, user) =>{
    res.json({ user: user });
  });
});

/**
 * @swagger
 * /user/join/:name/:passwd:
 *  post:
 *    summary: 가입
 *    tags: [User]
 */
router.post('/join/:name/:passwd', (req, res, next) => {
  const user = new User();
  user.name = req.params.name;
  user.passwd = req.params.passwd;

  user.save(err =>{
    if(err){
      console.error(err);
      res.json({result: 0});
      return;
    }
    res.json({result:1});
  });
});

module.exports = router;
