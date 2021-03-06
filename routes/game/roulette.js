var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');
var _money;

router.get('/', function(req, res, next) {
    var username = req.cookies.username;

    mysql.mysqlConnection.query('SELECT money FROM users WHERE username="' + username + '"', function(err, money) {
        res.render('roulette', { money: money });
    });
    mysql.mysqlConnection.query('SELECT money FROM users WHERE username="' + username + '"', function(err, results) {
        _money = results[0].money;
        console.log(_money)
    });
});

router.post('/', function(req, res, next) {
    var username = req.cookies.username;
    var result = getNumber();
    var red_numbers =  [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    var black_numbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    var green_numbers = [0];

    if(req.body.select === "odd") {
        if(oddBet(result)) {
            updateMoney(_money , req.body.amount * 2);
            res.end("Het roulettewiel draaide op " + result.toString() + ". Dit is een oneven getal. Je hebt " + (req.body.amount * 2).toString() + "$ gewonnen." );
        } else {
            updateMoney(_money , (req.body.amount - (req.body.amount * 2)));
            res.end("Het roulettewiel draaide op " + result.toString() + ". Dit is een even getal. Je hebt je inzet verloren.")
        }
    }
    if(req.body.select === "even") {
        if(evenBet(result)) {
            updateMoney(_money , req.body.amount * 2);
            res.end("Het roulettewiel draaide op " + result.toString() + ". Dit is een even getal. Je hebt " + (req.body.amount * 2).toString() + "$ gewonnen." );
        } else {
            updateMoney(_money , (req.body.amount - (req.body.amount * 2)));
            res.end("Het roulettewiel draaide op " + result.toString() + ". Dit is een oneven getal. Je hebt je inzet verloren.")
        }
    }
    if(req.body.select === "red") {
        if(redBet(result)) {
            updateMoney(_money , req.body.amount * 2);
            res.end("Het roulettewiel draaide op " + result.toString() + ". Dit is een rood getal. Je hebt " + (req.body.amount * 2).toString() + "$ gewonnen." );
        } else {
            updateMoney(_money , (req.body.amount - (req.body.amount * 2)));
            res.end("Het roulettewiel draaide op " + result.toString() + ". Dit is geen rood getal. Je hebt je inzet verloren.")
        }
    }
    if(req.body.select === "black") {
        if(blackBet(result)) {
            updateMoney(_money , req.body.amount * 2);
            res.end("Het roulettewiel draaide op " + result.toString() + ". Dit is een zwart getal. Je hebt " + (req.body.amount * 2).toString() + "$ gewonnen." );
        } else {
            updateMoney(_money , (req.body.amount - (req.body.amount * 2)));
            res.end("Het roulettewiel draaide op " + result.toString() + ". Dit is geen zwart getal. Je hebt je inzet verloren.")
        }
    }
    if(req.body.select === "green") {
        if(greenBet(result)) {
            updateMoney(_money , req.body.amount * 2);
            res.end("Het roulettewiel draaide op " + result.toString() + ". Dit is een groen getal. Je hebt " +  (req.body.amount * 36).toString() + "$ gewonnen." );
        } else {
            updateMoney(_money , (req.body.amount - (req.body.amount * 2)));
            res.end("Het roulettewiel draaide op " + result.toString() + ". Dit is geen groen getal. Je hebt je inzet verloren.")
        }
    }

    if(req.body.select === "single") {
        res.redirect('roulette/singlebet');
    }

    function getNumber() {
        min = 0;
        max = 36;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function oddBet(num) {
        return (num % 2 !== 0 )
    }

    function evenBet(num) {
        return (num % 2 === 0 )
    }

    function redBet(num) {
        return (red_numbers.indexOf(num) >= 0);
    }

    function blackBet(num) {
        return (black_numbers.indexOf(num) >= 0);
    }

    function greenBet(num) {
        return (green_numbers.indexOf(num) >= 0);
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



