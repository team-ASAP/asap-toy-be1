var express = require('express');
var router = express.Router();
const Project = require('../model/project');
const util = require('../util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', (req, res, next) => {
  Project.find({"isDeleted" : false}, (err, projects) => {
    res.json(util.successTrue(projects));
  })

});

// 우선 컬럼 세 개만 넣어서 insert 테스트 하였습니다 :) 
// 이미 projects라는게 경로에 명시되어 있기 때문에 create로 변경하였습니다.
router.post('/create', (req, res, next) => {
  const project = new Project();

  //https://docs.mongodb.com/manual/reference/method/Date/
  //required
  project.madeId = req.body.madeId;
  project.title = req.body.title;
  project.startDate = new Date(req.body.startDate);
  project.endDate = new Date(req.body.endDate);
  project.createdDate = new Date(req.body.createdDate);

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

  Project.update({"_id":req.body._id}, { isDeleted : true }, (err, value) => {
    console.log(req.body.projects_id);
    
    if(err){
      res.json(util.successFalse(err, "실패"));
    }
    else{
      res.json(util.successTrue(value));
    }
  });
});

module.exports = router;
