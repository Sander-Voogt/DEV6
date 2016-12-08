var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //TODO: implement username, return advanced listing of their stats
    res.render('stats', { user: username, stats: stats });
});

module.exports = router;
