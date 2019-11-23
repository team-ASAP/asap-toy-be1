var express = require('express');
var router = express.Router();
var dateUtils = require('date-utils');
const Project = require('../model/project');
const util = require('../util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', (req, res, next) => {
  Project.find({"isDeleted" : false}, (err, projects) => {
    res.json(util.successTrue(projects));
  });
});

// 우선 컬럼 세 개만 넣어서 insert 테스트 하였습니다 :) 
// 이미 projects라는게 경로에 명시되어 있기 때문에 create로 변경하였습니다.
router.post('/create', (req, res, next) => {
  const project = new Project();
  const newDate = new Date();

  //https://docs.mongodb.com/manual/reference/method/Date/
  //required
  project.madeId = req.body.madeId;
  project.title = req.body.title;

  // 그냥 new Date(req.body.starDate/endDate)로 넘기면 로컬 시간으로 들어가지 않아
  // format 함수 추가했습니다
  project.startDate = new Date(req.body.startDate).toFormat('YYYY-MM-DD');
  project.endDate = new Date(req.body.endDate).toFormat('YYYY-MM-DD');
  project.createdDate = newDate.toFormat('YYYY-MM-DD');

  //unrequired
  if(req.body.maxPeople){
    project.maxPeople = req.body.maxPeople;
  }

  project.isDeleted = false;


  project.save((err, value) =>{
    if(err){
      res.json(util.successFalse(err, "실패"));
      return;
    }
    res.json(util.successTrue(value));
  });
});

// project id 받아서 isDeleted true로 변경
router.post('/delete', (req, res, next) => {
  const newDate = new Date();

  Project.update({"_id":req.body._id}, { isDeleted : true , deletedDate : newDate.toFormat('YYYY-MM-DD')}, (err, value) => {
    console.log(req.body.projects_id);
    
    if(err){
      res.json(util.successFalse(err, "실패"));
    }
    else{
      res.json(util.successTrue(value));
    }
  });
});

// front에서 원래 입력되어있던 값 수정 폼에 뿌려두고 수정할 부분만 수정한 후 호출시켜서
// 수정할 수 있는 모든 값 덮어쓰는 방식으로 처리

// master branch에서 마지막 commit 두 개만 가져와서 merge
router.post('/modify', (req, res, next) => {
  const newDate = new Date();

  Project.update({"_id":req.body.id, isDeleted: false}, {
    title: req.body.title,
    startDate: new Date(req.body.startDate).toFormat('YYYY-MM-DD'),
    endDate: new Date(req.body.endDate).toFormat('YYYY-MM-DD'),
    maxPeople: req.body.maxPeople,
    modifiedDate: newDate.toFormat('YYYY-MM-DD')
  }, (err, value) => {
    console.log(req.body.id);

    if(err){
      res.json(util.successFalse(err, "실패"));
    }
    else{
      res.json(util.successTrue(value));
    }
  });
})

module.exports = router;
