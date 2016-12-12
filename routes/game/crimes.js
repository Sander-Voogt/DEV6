var express = require('express');
var router = express.Router();

function doCrime(userchance) {
    var chance = 100 / userchance;
    var random = math.floor(math.random() * 100 + 1);

    if (chance > random){
        userchance = userchance * 1.2;
        console.log("Gelukt");
    } else {
        console.log("In de gevangenis");
    }
}

router.get('/', function(req, res, next) {
    //TODO: return all crimes (and succes rate) for this user
    res.render('crimes', { crimes: crimes });
});

router.post('/', function(req, res, next) {
    //TODO: handle crime submitted, calculate chance and process the success or failure

});

module.exports = router;
