var express = require('express');
var router = express.Router();
var mysql = require('../database.js');

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
                    res.end("Welkom " + req.body.username);
                } else {
                    res.end("Dit wachtwoord is helaas verkeerd.")


                }


            }); } else {
            res.end("Deze gebruikersnaam bestaat nog niet, registreer u om de game te kunnen spelen.")

        }

    });


});

module.exports = router;
