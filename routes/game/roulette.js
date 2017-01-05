var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');

router.get('/', function(req, res, next) {
    res.render('roulette');
});

router.post('/', function(req, res, next) {
    var bet = 12;
    var red_numbers =  [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    var black_numbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    var green_numbers = [0, '00'];

    function getNumber() {
        min = 0;
        max = 37;
        var result = Math.floor(Math.random() * (max - min + 1)) + min;
        if(result === 37) {
            return '00'
        } else {
            return result;
        }
    }

    function parseBet(bet) {
        if(typeof(bet) === "number") {
            //logic
        }
        if(typeof(bet) === "string") {
            //logic
        }
        console.log(typeof(bet));
    }


    function SingleBet(choice) {
        roll = getNumber();
        console.log("CPU: " + roll.toString() + "\nUser: " + choice.toString());
        if (choice !== roll) {
            console.log("User lost");

        } else {
            console.log("User won");

        }
    }

});
module.exports = router;



