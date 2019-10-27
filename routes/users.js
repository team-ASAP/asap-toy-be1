const express = require('express');
const router = express.Router();
const User = require('../model/user');
const dormantUser = require('../model/dormantUser');
const withdrawalUser = require('../model/withdrawalUser');
const util = require('../util');

router.get('/', (req, res, next) => {
    res.json(util.successTrue());
});

router.get('/:id', (req, res, next) => {
    res.json(util.successTrue(req.params.id));
});

module.exports = router;
