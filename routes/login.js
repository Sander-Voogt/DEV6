'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('../database.js');

const User = require('../routes/user.js');

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {

    //Checken of beide inputboxes zijn ingevuld
    if (req.body.username == "" || req.body.password == "") {
        res.end("Niet alles is ingevuld.");
    }

    mysql.mysqlConnection.query('SELECT id FROM users WHERE username="' + req.body.username + '"', function (err, results) {
        var results = JSON.stringify(results);

        //Checken of de username bestaat, daarna pakt hij het password die bij de username past en controleerd of dit klopt
        if (results.length > 3) {
            mysql.mysqlConnection.query('SELECT password FROM users WHERE username="' + req.body.username + '"', function (err, passwordtest) {
                var passwordtest = JSON.stringify(passwordtest);
                if (passwordtest == "[{"+'"'+"password"+'"'+":"+'"'+req.body.password+'"'+"}]"){

                    //Handle data object in cookie
                    mysql.mysqlConnection.query('SELECT u.id, u.username, u.money FROM users AS u WHERE username="' + req.body.username + '"', function (err, results) {

                        //'legacy' code
                        res.cookie('username', req.body.username, { maxAge: 3600000 });

                        //object code
                        let newuser;
                        for (var u of results) {
                            newuser = new User(u.id, u.username, u.money);
                            res.cookie('data', newuser, { maxAge: 3600000 });
                        }

                        res.redirect('/');
                        res.end();
                    });

                } else {
                    res.end("Dit wachtwoord is helaas verkeerd.")
                }


            }); } else {
            res.end("Deze gebruikersnaam bestaat nog niet, registreer u om de game te kunnen spelen.")

        }

    });


});

module.exports = router;
