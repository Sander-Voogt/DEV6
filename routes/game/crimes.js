var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //TODO: return all crimes (and succes rate) for this user
    res.render('crimes', { crimes: crimes });
});

router.post('/', function(req, res, next) {
    //TODO: handle crime submitted, calculate chance and process the success or failure

});

module.exports = router;
