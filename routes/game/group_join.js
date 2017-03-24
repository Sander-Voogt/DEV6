var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');


router.get('/', function (req, res) {
    mysql.mysqlConnection.query('SELECT f_id, name, members, money FROM family', function(err, rows){
        var array = [];
        var username = req.cookies.username;
        for (var i of rows)
            {
                var newgroup;
                newgroup = new Group(i.f_id, i.name, i.members, i.money);
            }
            array.push(newgroup);
        console.log(array);
        res.render('groups', {items: rows, username: username});
    });
});

router.post('/', function(req, res, next) {
    var user = req.cookies.username;
    if(req.body.group == "groupid") {

        mysql.mysqlConnection.query('SELECT f_id FROM users WHERE username="' + user + '"', function (err, results) {
            if (results[0].f_id == "0") {
                mysql.mysqlConnection.query('SELECT f_id FROM family WHERE f_id="' + req.body.groupid + '"', function (err, results) {
                    if (results == "") {
                        res.end("Voer een geldige family id in.");
                    }
                    else {
                        mysql.mysqlConnection.query('SELECT members FROM family WHERE f_id = "' + req.body.groupid + '"', function (err, results) {
                        var members = (results[0].members);
                        mysql.mysqlConnection.query('UPDATE users SET f_id = ? WHERE username = ?', [req.body.groupid, user], function (err, results) {
                        });
                        mysql.mysqlConnection.query('UPDATE family SET members = ? WHERE f_id = ?', [members + 1, req.body.groupid], function () {
                        });
                    });
                }
                });
            }
            else {
                res.end("Je hebt al een family")
            }
        });
    }

    if (req.body.group == "groupname") {

        mysql.mysqlConnection.query('SELECT f_id FROM users WHERE username="' + user + '"', function (err, results) {
            if (results[0].f_id == "0") {
                if (req.body.groupname != "") {
                    mysql.mysqlConnection.query('SELECT name FROM family WHERE name="' + req.body.groupname + '"', function (err, results) {
                        var fname = JSON.stringify(results);
                        if (fname == "[]") {
                            var members = 1;
                            var money= 0;
                            mysql.mysqlConnection.query('INSERT INTO family (name, members, money) VALUES ("' + req.body.groupname + '", "' + members + '", "' + money + '")', function (err, result) {
                            });
                            mysql.mysqlConnection.query('SELECT MAX(f_id) as id FROM family', function (err, results) {
                                max = results[0].id;
                                    mysql.mysqlConnection.query('UPDATE users SET f_id = ? WHERE username = ?', [max, user], function (err, results) {
                                    });
                            });
                        }
                    });
                }
            }
        });
    }

    if(req.body.group == "groupexit"){
        mysql.mysqlConnection.query('SELECT f_id FROM users WHERE username="' + user + '"', function (err, results){
            var f_id = results[0].f_id;
            if (f_id != 0){
                mysql.mysqlConnection.query('UPDATE users SET f_id = ? WHERE username = ?', [0, user], function (err, results) {
            });
                mysql.mysqlConnection.query('SELECT members FROM family where f_id="' + f_id + '"', function (err, results) {
                    var members = results[0].members;
                    console.log(members);
                    if (members == 1){
                        mysql.mysqlConnection.query('DELETE FROM family WHERE f_id="' + f_id + '"', function(err, results) {});
                    }
                    else{
                        var newmembers = members -1;
                        mysql.mysqlConnection.query('UPDATE family SET members = ? WHERE f_id = ?', [newmembers, f_id], function (err, results) {
                        });

                    }
                });
            }
        });
    }
});

module.exports = router;
