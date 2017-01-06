var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');
var moment = require('moment');

router.get('/', function(req, res, next) {
    var currentTime = moment().unix();
    var username = req.cookies.username;

    mysql.mysqlConnection.query("SELECT username, time FROM prison WHERE username = '" + username + "' AND time > '"+ currentTime +"'ORDER BY id DESC LIMIT 1;", function (err, results) {
        if(results == false){
            res.redirect("/game/groupinfo");

        } else {
            mysql.mysqlConnection.query("Select time From prison WHERE username = '" + username + "' ORDER BY id DESC LIMIT 1;", function (err, results) {
                if (err) throw err;

                console.log(results[0].time);
                res.render('tadam', {current: currentTime, database: results[0].time, username: username});
            });
        }
    });
});

module.exports=router;
