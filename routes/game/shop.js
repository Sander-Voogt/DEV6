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

router.get('/:weapon', function(req, res, next) {
    var username = req.cookies.username;
    var weapon = req.params.weapon;
    var query = 'SELECT u.money, s.price, s.amount FROM users u, shop s WHERE u.username="' + username + '" AND s.name="' + weapon + '"';

    mysql.mysqlConnection.query(query, function(err, result) {
        var playermoney = (result[0].money);
        var weaponcost = (result[0].price);
        var weaponamount = (result[0].amount);

        if(module.exports.checkPurchase(playermoney, weaponcost, weaponamount) == 1){

            var doquery1 = 'INSERT INTO inventory (username, weapon, worth) VALUES ("' + username + '", "' + weapon + '", "' + (weaponcost / 2) + '")';
            var doquery2 = 'UPDATE shop SET amount="' + (weaponamount - 1) + '" WHERE name="' + weapon + '"';
            var doquery3 = 'UPDATE users SET money="' + (playermoney - weaponcost) + '" WHERE username="' + username + '"';

                mysql.mysqlConnection.query(doquery1, function (err, results) {});
                mysql.mysqlConnection.query(doquery2, function (err, results) {});
                mysql.mysqlConnection.query(doquery3, function (err, results) {});

                res.redirect('/game/inventory/');
                res.end();

        }else{
            res.end("Je hebt niet genoeg geld om dit wapen te kopen of dit wapen is uitverkocht.")
        }

    });

});


module.exports = router;

module.exports.checkPurchase = function(money, cost, amount) {
    var money = money;
    var cost = cost;
    var amount = amount;

    if(money >= cost && amount > 0){
        return 1;
    }
    else {
        return 0;
    }
}