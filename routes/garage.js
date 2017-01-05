var express = require('express');
var router = express.Router();
var mysql = require('../database.js');

router.get('/', function(req, res, next) {
    var username = req.cookies.username;

    //inventory items ophalen
    mysql.mysqlConnection.query('SELECT * FROM garage WHERE username="' + username + '"', function(err, rows) {

                res.render('garage', { username: username, cars: rows });

            });
});

module.exports = router;