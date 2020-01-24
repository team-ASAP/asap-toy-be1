var express = require('express');
var router = express.Router();
const joinProject = require('../model/joinProject');
const util = require('../util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * 일단 도저히 모르겠으니 기능이 뭐가 들어가야지만 적읍니다
 * Join = 프로젝트 참여
 * 1. no, userId, projectNo, createDate, modifiedDate, isDeleted, deleteDate, isApproval, coment 정보 입력
 * 2. projectNo, createDate, isApproval, comment 정보 출력
 * 3. 참여여부 설정하기
 * 4. 삭제하기 
 */

 //1. 프로젝트 list 생성하기
 router.post('/create', (req, res, next)=>{
   var jp = new joinProject();
   var nowDate = new Date();
   jp.userId = req.body.userId;
   jp.projectNo = req.body.projectNo;
   jp.createDate = nowDate.toFormat('YYYY-MM-DD');
   jp.comment = req.body.comment;

   jp.save((err, value)=>{
     if(err){
       res.json(util.successFalse(err,"실패"));
       return;
     }
     res.json(util.successTrue(value));
   })
 });

 //2. 프로젝트 list 가져오기 (우주님 projects.js 참조 isDeleted가 false가 아닌 것만 가져오기)
 router.get('/list', (req, res, next)=>{
  joinProject.find({"isDeleted": false}, (err, value) => {
     res.json(util.successTrue(value));
   })
 });

 //3. 프로젝트 승인여부 설정
 router.post('/approval/:userId', (req, res, next)=>{
    joinProject.update({"userId":req.params.userId}, { isApproval:true }, (err, value) => {     
      if(err){
        res.json(util.successFalse(err, "실패"));
      }
      else{
        res.json(util.successTrue(value));
      }
    });
 });

  //4. 삭제하기(승인 거절 후 리스트에서 지울 경우)
  router.post('/delete/:userId', (req, res, next)=>{
    const newDate = new Date();
    joinProject.update({"userId":req.params.userId}, { isDeleted : true , deletedDate : newDate.toFormat('YYYY-MM-DD') }, (err, value) => {     
      if(err){
        res.json(util.successFalse(err, "실패"));
      }
      else{
        res.json(util.successTrue(value));
      }
    });
 });


module.exports = router;
