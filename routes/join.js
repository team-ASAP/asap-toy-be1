var express = require('express');
var router = express.Router();
const User = require('../model/join');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * 일단 도저히 모르겠으니 기능이 뭐가 들어가야지만 적읍니다
 * Join = 프로젝트 참여
 * 1. 회원 정보, 프로젝트 no, 하고 싶은 말, 승인 여부의 대한 정보를 가져오기 
 */

module.exports = router;
