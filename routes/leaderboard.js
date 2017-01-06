var express = require('express');
var router = express.Router();
var mysql = require('../database.js');

router.get('/', function(req, res, next) {
    var _username = req.cookies.username;
    mysql.mysqlConnection.query('SELECT username,money FROM users ORDER BY money DESC LIMIT 3;', function(err, data) {
            res.render('leaderboard', {data: data });
            console.log(data[2].username);
            console.log(data[2].money);
        });
    });

module.exports = router;
