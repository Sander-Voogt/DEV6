var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {
    //TODO: handle register: check database for duplicates, register user
});

module.exports = router;
