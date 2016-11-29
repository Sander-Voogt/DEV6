var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //TODO: return all players available to kill (and success rate with available weapons) for this user
    res.render('murder', { players: players, weapons: weapons, percentages: percentages });
});

router.post('/', function(req, res, next) {
    //TODO: handle the player submitted, calculate chance and process the success or failure

});

module.exports = router;
