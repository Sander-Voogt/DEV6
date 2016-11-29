var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //TODO: handle logout, redirect user
    res.redirect('/index');
});

module.exports = router;
