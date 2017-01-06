var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');

router.get('/', function(req, res, next) {
    var username = req.cookies.username;

    mysql.mysqlConnection.query('SELECT * FROM inventory WHERE username="' + username + '"', function(err, rows) {
        mysql.mysqlConnection.query('SELECT i.weapon, i.worth FROM inventory i, users u WHERE u.weapon_id=i.id', function(err, primair) {
            mysql.mysqlConnection.query('SELECT money FROM users WHERE username="' + username + '"', function(err, money) {
                res.render('inventory', { username: username, weapons: rows, money: money, primair: primair });
            });
        });
    });
});

router.get('/:weapon', function(req, res, next) {
    var username = req.cookies.username;
    var weapon = req.params.weapon;

    mysql.mysqlConnection.query('UPDATE users SET weapon_id="' + weapon + '" WHERE username="' + username + '"', function(err, result) {
        res.redirect('/game/inventory');
        res.end();
    });
});

module.exports = router;