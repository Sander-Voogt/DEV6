var express = require('express');
var router = express.Router();
var mysql = require('../database.js');

router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', function(req, res, next) {

    //Checken of beide inputboxes zijn ingevuld
    if (req.body.username == "" || req.body.password == "") {
        res.end("Niet alles is ingevuld.");
    }

    //controle of de gebruiker al bestaat
    mysql.mysqlConnection.query('SELECT id FROM users WHERE username="' + req.body.username + '"', function (err, results) {
        var results = JSON.stringify(results);

        //wanneer de 'results' leeg is de lijst maar 2 groot. dus voor duplicates checken we of die groter dan 3 is
        //(ja er zijn betere manieren om dit te doen)
        if (results.length > 3) {
            res.end("Gebruikersnaam bestaat al.");
        } else {
            //gebruiker registeren
            mysql.mysqlConnection.query('INSERT INTO users (username, password) VALUES ("' + req.body.username + '", "' + req.body.password + '")', function (err, results) {
                res.end(req.body.username + " is aangemaakt.");
            });
        }
    });
});


module.exports = router;