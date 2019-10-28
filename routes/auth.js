const express = require('express');
const router = express.Router();
const User = require('../model/user');
const util = require('../util');
const jwt = require('jsonwebtoken');
const confJWT = require('../config').JWT;
const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();

//로그인
router.post('/login', (req, res, next) => {
    User.findOne({"id" : req.body.id }, (err, user) => {
        if(err) return res.json(util.successFalse(user, err));
        if(!user) return res.json(util.successFalse(user, err));

        //기존 솔트값이용해서 암호화하고 일치하면 로그인
        hasher({password:req.body.passwd, salt:user.salt}, (err, pass, salt, hash) => {
            if(err) return res.json(util.successFalse(user, err));
            
            if(hash === user.passwd){
                //token 발급
                const token = jwt.sign(
                    { id: user.id },
                    //비밀키
                    confJWT.secretKey,
                    {
                        //24시간동안 유효
                        expiresIn: confJWT.expiresIn
                    }
                );
                res.cookie("user", token);
                return res.json(util.successTrue("login success"));
            }else{
                return res.json(util.successFalse("login failed"));
            }
        });
    });
});

//회원가입
router.post('/join', (req, res, next) => {
    const user = new User();

    //hasher
    hasher({password: req.body.passwd}, (err, pass, salt, hash) => {
        if(err) return res.json(util.successFalse(err, "해쉬만들기 실패"));
        
        // required
        user.id = req.body.id;
        user.passwd = hash;
        user.salt = salt;
        
        // unrequired
        if(req.body.data){
            user.data = req.body.data;
        }

        user.save((err) => {
            if(err){
                res.json(util.successFalse(err, "회원가입 실패"));
                return;
            }
            res.json(util.successTrue("성공"));
        });
    });
});

router.get('/me', (req, res, next) => {

});

router.get('/refresh', (req, res, next) => {
  
});

module.exports = router;
