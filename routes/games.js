var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var username = req.cookies.username;
    res.render('games', { username: username });
});

router.post('/', function(req, res, next) {


});

module.exports = router;
