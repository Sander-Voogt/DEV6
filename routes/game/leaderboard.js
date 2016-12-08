var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //TODO: return leaderboard with all players ranked by money
    res.render('leaderboard');
});

module.exports = router;
