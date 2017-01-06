var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');


router.get('/', function(req, res, next) {
    //TODO: return all crimes (and succes rate) for this user
    var moment = require('moment');
    var currentTime = moment().unix();
    var username = req.cookies.username;

    mysql.mysqlConnection.query("SELECT username, time FROM prison WHERE username = '" + username + "' AND time > '"+ currentTime +"'ORDER BY id DESC LIMIT 1;", function (err, rows) {

        if(rows == false){
            mysql.mysqlConnection.query("Select chance From users WHERE username = '" + username + "'", function (err, rows) {
                if (err) throw err;
                res.render('crimes', {crimes: 'tadam', chance: rows, username: username});
            });

        } else {
            mysql.mysqlConnection.query("Select time From prison WHERE username = '" + username + "' ORDER BY id DESC LIMIT 1;", function (err, rows) {
                if (err) throw err;

                console.log(rows[0].time);
                res.render('tadam', {current: currentTime, database: rows[0].time, username: username});
            });
        }
    });


});

router.post('/', function(req, res, next) {
    //TODO: handle crime submitted, calculate chance and process the success or failure
    var username = req.cookies.username;
    var moment = require('moment');


    var chance = req.body.chance;
    var crime = module.exports.doCrime(chance);

    var currentTime = moment().unix();
    var newtime = currentTime + 90;

    console.log(currentTime);
    console.log(newtime);

    if(crime > chance){
        mysql.mysqlConnection.query("Update users Set chance='" + crime + "' Where username = '" + username + "'"), function (err,rows){};
        mysql.mysqlConnection.query('UPDATE users SET users.money=users.money+1000 WHERE username="' + username +'"', function(err, results) {});
        res.render("gelukt", {username: username, crime: "Je hebt 1000 euro verdient"});
        res.end();
    } else {
        mysql.mysqlConnection.query("INSERT INTO prison (username, time) VALUES ('" + username + "', '" + newtime + "')", function (err, rows) {
            if(err) throw err;
        });
        res.redirect("/game/crime");
        res.end();
    }
});

module.exports = router;

module.exports.doCrime = function(userchance){
    var chance = userchance;
    var random = Math.floor(Math.random() * 100 + 1);

    if (chance > random){
        if(chance < 90){
            chance = chance * 1.08;
        } else if(chance < 50){
            chance = chance * 1.05;
        }else if(chance < 20){
            chance = chance * 1.1;
        }
        chance = chance * 1.000001
        console.log("Gelukt");
        return chance;
    } else {
        console.log("In de gevangenis");
        return chance;
    }
}