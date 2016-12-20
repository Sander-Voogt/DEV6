var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');

router.get('/', function (req, res) {
    mysql.mysqlConnection.query('SELECT f_id, name, members, money FROM family', function(err, rows){
        var username = req.cookies.username;
        console.log(rows);
        res.render('groups', {items: rows, username: username});
    });
});

router.post('/', function(req, res, next) {
    var user = req.cookies.username;
    mysql.mysqlConnection.query('SELECT f_id FROM users WHERE username="' + user + '"', function (err, results) {
        if (results[0].f_id == "0") {
            mysql.mysqlConnection.query('SELECT f_id FROM family WHERE f_id="' + req.body.groupid + '"', function (err, results) {
                if (results == "") {
                    res.end("Voer een geldige family id in.");
                }
                else {
                    mysql.mysqlConnection.query('SELECT members FROM family WHERE f_id = "' + req.body.groupid + '"', function (err, results) {
                        var members = (results[0].members);
                        console.log("members seledted" + members);
                        mysql.mysqlConnection.query('UPDATE users SET f_id = ? WHERE username = ?', [req.body.groupid, user], function (err, results) {
                        });
                        mysql.mysqlConnection.query('UPDATE family SET members = ? WHERE f_id = ?', [members + 1, req.body.groupid], function () {
                            res.redirect(req.get('referer'))
                        });
                    });
                }
            });
        }
        else {
            res.end("Je hebt al een family lul")
        }
    });
});

module.exports = router;
