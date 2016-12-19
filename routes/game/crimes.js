var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');

function doCrime(userchance) {
    var chance = 100 / userchance;
    var random = Math.floor(Math.random() * 100 + 1);

    if (chance < random){
        userchance = userchance * 1.2;
        console.log("Gelukt");
        console.log(chance);
        console.log(random)
        return userchance;
    } else {
        console.log(chance);
        console.log(random);

        console.log("In de gevangenis");
    }
}

router.get('/', function(req, res, next) {
    //TODO: return all crimes (and succes rate) for this user
    var moment = require('moment');
    var currentTime = moment().unix();

    mysql.mysqlConnection.query("SELECT p.user FROM prison p, users u WHERE p.user = 10 AND p.time > '"+ currentTime +"'", function (err, rows) {

        if(rows == false){
            res.render('tadam');
        } else {
            mysql.mysqlConnection.query("Select chance From users WHERE id = 10", function (err, rows) {
                if (err) throw err;
                res.render('crimes', {crimes: 'tadam', chance: rows});
            });
        }
    });


});

router.post('/', function(req, res, next) {
    //TODO: handle crime submitted, calculate chance and process the success or failure
    var moment = require('moment');

    var chance = 1;
    var crime = doCrime(chance);

    var currentTime = moment().unix();
    var newtime = currentTime + 90;

    console.log(currentTime);
    console.log(newtime);

    if(crime > chance){
        res.end("Gelukt");
    } else {
        mysql.mysqlConnection.query("INSERT INTO prison (user_id, time) VALUES (10, '" + newtime + "')", function (err, rows) {
            if(err) throw err;
            res.end("Gelukt in database");
        });
        res.end("Jammer, je moet de gevangenis in");
    }
    res.render('index', { title: "Express"});
});

module.exports = router;
