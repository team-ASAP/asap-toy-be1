var express = require('express');
var router = express.Router();
const Project = require('../model/project');
const util = require('../util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 우선 컬럼 세 개만 넣어서 insert 테스트 하였습니다 :) 
// 이미 projects라는게 경로에 명시되어 있기 때문에 create로 변경하였습니다.
router.post('/create/:no/:madeId/:title', (req, res, next) => {
  const project = new Project();
  project.no = req.params.no;
  project.madeId = req.params.madeId;
  project.title = req.params.title;

  project.save((err, value) =>{
    if(err){
      console.error(err);
      
      res.json(util.successFalse(value, "실패"));
      return;
    }
    res.json(util.successTrue(value));
  });
});

module.exports = router;
