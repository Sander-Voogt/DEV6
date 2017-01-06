var express = require('express');
var router = express.Router();
var mysql = require('../../database.js');



function doCrime(userchance) {
    var chance = userchance;
    var random = Math.floor(Math.random() * 100 + 1);

    if (chance > random){
        userchance = userchance * 1.2;
        console.log("Gelukt");
        console.log(chance);
        console.log(random)
        return userchance;
    } else {
        console.log(chance);
        console.log(random);

        console.log("In de gevangenis");
    }
}

function createModel(){

    var randomBrand = Math.floor((Math.random() * 10) + 1);
    brand = ['audi A6', 'fiat panda', 'BMW M5', 'Peugot 108', 'Renault Megane', 'TATA', 'Porsche 911', 'Lambogini GT', 'Ford KA', 'Kia picanto', 'Mitsubitsi Spacestar'];

    carName = brand[randomBrand];

    return carName;
}

function createPrice(){
    return price = Math.floor((Math.random() * 10000) + 800);
}

router.get('/', function(req, res, next) {
    //TODO: return all crimes (and succes rate) for this user
    var moment = require('moment');
    var currentTime = moment().unix();
    var username = req.cookies.username;

    mysql.mysqlConnection.query("SELECT username, time FROM prison WHERE username = '" + username + "' AND time > '"+ currentTime +"'ORDER BY id DESC LIMIT 1;", function (err, rows) {

        if(rows == false){
            mysql.mysqlConnection.query("Select car_chance From users WHERE username = '" + username + "'", function (err, rows) {
                if (err) throw err;
                res.render('car', {crimes: 'tadam', chance: rows, username: username});
            });

        } else {
            mysql.mysqlConnection.query("Select time From prison WHERE username = '" + username + "' ORDER BY id DESC LIMIT 1;", function (err, rows) {
                if (err) throw err;

                console.log(rows[0].time);
                res.render('car', {current: currentTime, database: rows[0].time, username: username});
            });
        }
    });


});

router.post('/', function(req, res, next) {
    //TODO: handle crime submitted, calculate chance and process the success or failure
    var username = req.cookies.username;
    var moment = require('moment');


    var chance = req.body.chance;
    var crime = doCrime(chance);

    var currentTime = moment().unix();
    var newtime = currentTime + 90;

    console.log(currentTime);
    console.log(newtime);

    var model = createModel();
    var price = createPrice();

    console.log(model);

    if(crime > chance){
        mysql.mysqlConnection.query("Update users Set car_chance='" + crime + "' Where username = '" + username + "'"), function (err,rows){};
        mysql.mysqlConnection.query('Insert into garage (username, car_name, car_value) Values ("' + username +'", "' + model + '", "' + price +'")', function(err, results) {});
        res.render("gelukt", {username: username, crime: "Je hebt een auto gejat", merk: model, prijs: price});
    } else {
        mysql.mysqlConnection.query("INSERT INTO prison (username, time) VALUES ('" + username + "', '" + newtime + "')", function (err, rows) {
            if(err) throw err;
        });
        res.redirect("/game/crime");
        res.end();
    }
    res.render('index', { title: "Express"});
});

module.exports = router;
