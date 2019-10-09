var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('apiDocs/index');
});

router.get('/user', (req, res, next) => {
    res.send();
});

module.exports = router;