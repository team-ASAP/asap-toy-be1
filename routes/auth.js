const express = require("express");
const router = express.Router();
const User = require("../model/user");
const util = require("../util");
const jwt = require("jsonwebtoken");

router.post(
  "/login",
  (req, res, next) => {
    let isValid = true;
    const validationError = {
      name: "ValidationError",
      errors: {}
    };

    if (!req.body.id) {
      isValid = false;
      validationError.errors.id = { message: "Id is required!" };
    }

    if (!req.body.passwd) {
      isValid = false;
      validationError.errors.passwd = { message: "Password is required!" };
    }

    if (!isValid) return res.json(util.successFalse(validationError));
    else next();
  }, 
  (req, res, next) => {
    User.findOne({ id: req.body.id })
      .select({ passwd: 1, id: 1 })
      .exec((err, user) => {
        if (err) return res.json(util.successFalse(err));
        else if (!user || !user.authenticate(req.body.password))
          return res.json(
            util.successFalse(null, "Username or Password is invalid")
          );
        else {
          var payload = {
            _id: user._id,
            username: user.username
          };
          var secretOrPrivateKey = process.env.JWT_SECRET;
          var options = { expiresIn: 60 * 60 * 24 };
          jwt.sign(payload, secretOrPrivateKey, options, function(err, token) {
            if (err) return res.json(util.successFalse(err));
            res.json(util.successTrue(token));
          });
        }
      });
  }
);

router.get("/me", (req, res, next) => {});

router.get("/refresh", (req, res, next) => {});

module.exports = router;
