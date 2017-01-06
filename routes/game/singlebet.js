var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');
var _money;


router.get('/', function(req, res, next) {
    var username = req.cookies.username;
    res.render('singlebet');

    mysql.mysqlConnection.query('SELECT money FROM users WHERE username="' + username + '"', function(err, results) {
        _money = results[0].money;
        console.log(_money);
        console.log(username);
    });
});

router.post('/', function(req, res, next) {
    var username = req.cookies.username;
    var result = getNumber();

    if(req.body.getal % 1 === 0 ) {
        if(singleBet(result, req.body.getal)) {
            updateMoney(_money , req.body.amount * 36);
            res.end("Het roulettewiel draaide op " + result.toString() + ". Jij gokte: " + req.body.getal.toString() + ". Dit getal is gelijk en je wint " + (req.body.amount * 36).toString() + "$." )
        } else {
            updateMoney(_money , (req.body.amount - (req.body.amount * 2)));
            res.end("Het roulettewiel draaide op " + result.toString() + ". Jij gokte: " + req.body.getal.toString() + ". Dit getal is niet gelijk en je hebt je inzet verloren.");
        }
    } else {
        res.end("Vul een geldig getal in (0 - 36)");
    }

    function getNumber() {
        min = 0;
        max = 36;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function singleBet(generated, choice) {
        return(generated === choice);
    }

    function updateMoney(money, amount) {
        var newValue = money + parseInt(amount);
        console.log("Before: " + money);
        console.log("To Add: " + amount);
        console.log("After: "+ newValue);
        mysql.mysqlConnection.query('UPDATE users SET money=' + newValue + ' WHERE username="' + username + '"', function(err, results) {
            if (!err) {
                res.status(201).end();
            } else {
                res.status(500);
            }
        });
    }
});

module.exports = router;
