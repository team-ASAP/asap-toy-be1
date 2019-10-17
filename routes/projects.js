var express = require('express');
var router = express.Router();
const Project = require('../model/project');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:no', (req, res, next) => {
  User.find({no : req.params.no }, (err, user) =>{
    res.json({ project: project });
  });
});

// 우선 컬럼 세 개만 넣어서 insert 테스트 하였습니다 :) 
router.post('/createProject/:no/:madeId/:title', (req, res, next) => {
  const project = new Project();
  project.no = req.params.no;
  project.madeId = req.params.madeId;
  project.title = req.params.title;

  project.save(err =>{
    if(err){
      console.error(err);
      res.json({result: 0});
      return;
    }
    res.json({result:1});
  });
});

module.exports = router;
