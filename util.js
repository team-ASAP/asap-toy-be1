const jwt = require('jsonwebtoken');
const JWT = require('./config').JWT;

const util = {};

util.successTrue = data => {
  return {
    success:true,
    message:null,
    errors:null,
    data:data
  };
};

util.successFalse = (err, message) => {
  if(!err&&!message) message = 'data not found';
  return {
    success:false,
    message:message,
    errors:(err)? util.parseError(err): null,
    data:null
  };
};

util.parseError = errors => {
  const parsed = {};
  if(errors.name == 'ValidationError'){
    for(let name in errors.errors){
      let validationError = errors.errors[name];
      parsed[name] = { message:validationError.message };
    }
  } else if(errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
    parsed.username = { message:'This username already exists!' };
  } else {
    parsed.unhandled = errors;
  }
  return parsed;
};


// middlewares
util.isLoggedin = (req,res,next) => {
  const token = req.cookies.user;
  if (!token) next();
  else {
    jwt.verify(token, JWT.secretKey, (err, decoded) => {
      if(err) return res.json(util.successFalse(err));
      else{
        req.decoded = decoded;
        console.log(req.decoded);
        next();
      }
    });
  }
};

module.exports = util;