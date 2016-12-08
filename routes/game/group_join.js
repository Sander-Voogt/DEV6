var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //TODO: return all groups available to join
    res.render('group_join', { groups: groups });
});

router.post('/', function(req, res, next) {
    //TODO: handle submitted group to join, add player to group in database

});

module.exports = router;
