const express = require('express');
const router = express.Router();
const User = require('../model/user');
const dormantUser = require('../model/dormantUser');
const withdrawalUser = require('../model/withdrawalUser');
const util = require('../util');

//아이디로 회원 찾기 (미완)
router.get('/find-id/:id', (req, res, next) => {
  User.find({name : req.params.name }, (err, user) =>{
    res.json({ user: user });
  });
});

//내 정보
router.get('/me', util.isLoggedin, (req, res, next) => {
  if(req.decoded){
      const me = {
          id: req.decoded.id,
          data: null
      };

      User.findOne({ id: me.id }, (err, user)=> {
          if(err) return res.json(util.successFalse(err, '몽고디비에러'));
          if(!user) return res.json(tuil.successFalse(err, '일치하는 회원이 없음'));

          me.data = user.data;

          return res.json(util.successTrue(me));
      });
  }else{
      return res.json(util.successFalse('로그인 상태가 아닙니다.'));
  }
});

module.exports = router;