var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');

router.get('/', function(req, res, next) {
    var username = req.cookies.username;
    mysql.mysqlConnection.query('SELECT * FROM shop ORDER BY price ASC', function(err, rows) {
        mysql.mysqlConnection.query('SELECT money FROM users WHERE username="' + username + '"', function(err, money) {
            res.render('shop', { username: username, money: money, weapons: rows });
        });
    });
});

module.exports = router;
