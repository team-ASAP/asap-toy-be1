const express = require('express');
const router = express.Router();
const User = require('../model/user');
const util = require('../util');
const jwt = require('jsonwebtoken');
const confJWT = require('../config').JWT;
const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();

router.post('/login', (req, res, next) => {
    User.findOne({"id" : req.body.id, "passwd": req.body.passwd }, (err, user) => {
        if(err) return res.status(500).json(util.successFalse(user, err));
        if(!user) return res.status(404).json(util.successFalse(user, err));

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
        res.json(user);
    });
});

//임시 회원가입
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
