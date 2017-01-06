var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');
var moment = require('moment');
var x =[];

function doCrime(userchance) {
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
    }
}

router.get('/', function(req, res, next) {
    var username = req.cookies.username;
    mysql.mysqlConnection.query('SELECT f_id FROM users WHERE username="' + username + '"', function (err, results){
        var f_id = results[0].f_id;
        console.log(f_id);
        if (f_id == 0){
            res.end("Je hebt geen groep dus kies er 1 als je hier per se wat wilt zien")
        }
        else {
            mysql.mysqlConnection.query('SELECT username FROM users WHERE f_id="' + f_id + '" and username <>"' + username + '"', function (err, rows) {
                res.render('mygroup', {items: rows, username: username});
            });
        }
    });
});

router.post('/', function(req, res, next) {
    var username = req.cookies.username;


    if (req.body.cbutton == "startcrime"){
        x = req.body.checkbox;
        console.log(typeof x);
        if (typeof x == 'string'){
            x = x.split();
        }
        var name = username.valueOf();
        x.push(name);
        res.render('groupcrime',{username: username});
    }

    if (req.body.cbutton == "docrime") {
        var chance = req.body.chance;
        var crime = doCrime(chance);

        var currentTime = moment().unix();
        var newtime = currentTime + 90;

        if (crime > chance) {
            x.forEach(function(i){
                mysql.mysqlConnection.query("Update users Set chance='" + crime + "' Where username = '" + i + "'", function (err) {
                });
            });
            mysql.mysqlConnection.query('SELECT f_id FROM users WHERE username="' + username + '"', function (err, results) {
                var f_id = results[0].f_id;
                mysql.mysqlConnection.query('UPDATE family SET money=money+1000 WHERE f_id="' + f_id + '"', function (err) {
                });
            });
            res.render("gelukt", {username: username});
            res.end();
        } else {
            x.forEach(function (i) {
                mysql.mysqlConnection.query("INSERT INTO prison (username, time) VALUES ('" + i + "', '" + newtime + "')", function (err) {
                    if (err) throw err;
                });
            });
            res.redirect("/game/groupcrime");
            res.end();
        }
    }
});

module.exports = router;
