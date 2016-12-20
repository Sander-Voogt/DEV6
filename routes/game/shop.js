var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');

router.get('/', function(req, res, next) {
    var username = req.cookies.username;
    mysql.mysqlConnection.query('SELECT * FROM shop', function(err, rows) {
        res.render('shop', { username: username, weapons: rows });
    });
});

router.post('/', function(req, res, next) {
    //TODO: handle bought weapon submitted, check if possible with available money and add to inventory in database

});

module.exports = router;
