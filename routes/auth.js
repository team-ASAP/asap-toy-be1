const express = require('express');
const router = express.Router();
const User = require('../model/user');
const WithdrawalUser = require('../model/withdrawalUser');
const util = require('../util');
const jwt = require('jsonwebtoken');
const confJWT = require('../config').JWT;
const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();

//로그인
router.post('/login', (req, res, next) => {
    if (req.decoded) {
        return res.json(util.successTrue(req.decoded));
    } else {
        User.findOne({ "id": req.body.id }, (err, user) => {
            if (err) return res.json(util.successFalse(user, err));
            if (!user) return res.json(util.successFalse(user, err));

            //기존 솔트값이용해서 암호화하고 일치하면 로그인
            hasher({ password: req.body.passwd, salt: user.salt }, (err, pass, salt, hash) => {
                if (err) return res.json(util.successFalse(user, err));

                if (hash === user.passwd) {
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
                } else {
                    return res.json(util.successFalse("login failed"));
                }
            });
        });
    }
});

//회원가입
router.post('/join', (req, res, next) => {
    if (req.decoded) {
        return res.json(util.successTrue(req.decoded));
    } else {
        const user = new User();

        //hasher
        hasher({ password: req.body.passwd }, (err, pass, salt, hash) => {
            if (err) return res.json(util.successFalse(err, "해쉬만들기 실패"));

            // required
            user.id = req.body.id;
            user.passwd = hash;
            user.salt = salt;

            // unrequired
            if (req.body.data) {
                user.data = req.body.data;
            }

            user.save((err) => {
                if (err) {
                    res.json(util.successFalse(err, "회원가입 실패"));
                    return;
                }
                res.json(util.successTrue("성공"));
            });
        });
    }
});

//탈퇴
router.post('/withdrawal', util.isLoggedin, (req, res, next) => {
    if(req.decoded){
        const passwd = req.body.passwd;
        if(!passwd) return res.json(util.successFalse("패스워드가 존재하지않음"));
        
        //로그인 되어 있는 아이디로 솔트 값 찾기
        User.findOne({ "id": req.decoded.id }, (err, user) => {
            if (err) return res.json(util.successFalse(user, err));
            if (!user) return res.json(util.successFalse(user, err));

            //기존 솔트값이용해서 암호화
            hasher({ password: passwd, salt: user.salt }, (err, pass, salt, hash) => {
                if (err) return res.json(util.successFalse(user, err));

                //암호화 된 값과 저장된 비밀번호 비교
                if (hash === user.passwd) {
                    const withdrawalUser = new WithdrawalUser();

                    withdrawalUser.id = user.id;
                    withdrawalUser.passwd = user.passwd;
                    withdrawalUser.salt = user.salt;
                    withdrawalUser.data = user.data;

                    //탈퇴회원 저장
                    withdrawalUser.save((err) => {
                        if (err) {
                            res.json(util.successFalse(err, "실패"));
                            return;
                        }
                        //기존 유저에서 지우기
                        User.deleteOne({ id: user.id }, err => {
                            if(err) return res.json(util.successFalse(err, "삭제 실패"));
                            return res.json(util.successTrue("탈퇴처리 성공"));
                        });
                    });
                } else {
                    return res.json(util.successFalse("비밀번호 불일치"));
                }
            });
        });
    }else{
        return res.json(util.successFalse("토큰 만료 혹은 잘못된 접근"));
    }
});

module.exports = router;
