var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {
    //TODO: handle login: check database, allow/deny access, set cookie
});

module.exports = router;
