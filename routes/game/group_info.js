var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //TODO: return the group info: name and players
    res.render('group_info', { name: groupname, players: players });
});


module.exports = router;
