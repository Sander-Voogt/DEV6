var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //TODO: return all weapons with prices
    res.render('shop', { weapons: weapons });
});

router.post('/', function(req, res, next) {
    //TODO: handle bought weapon submitted, check if possible with available money and add to inventory in database

});

module.exports = router;
