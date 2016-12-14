var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');

router.get('/', function (req, res) {
    mysql.mysqlConnection.query('SELECT f_id, name, members, money FROM family', function(err, rows)
    {
        //TODO: return the group info: name and players
        console.log(rows);
        res.render('groups', {items: rows});
    });
});

router.post('/', function(req, res, next) {
    mysql.mysqlConnection.query('SELECT f_id FROM family WHERE f_id="' + req.body.groupid + '"', function (err, results) {
        var a = JSON.stringify(results);
        console.log(a);

        if (results == "") {
            res.end("Voer een geldige family id in.");
        } else {
            //TODO: handle submitted group to join, add player to group in database
        }
    });
});

module.exports = router;
