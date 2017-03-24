var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //TODO: show a proper welcome screen with links to login or register

  var username = req.cookies.username;

  if(req.cookies.data){
    console.log(req.cookies.data);
    //TODO: uitbreiden data uitlezen
  }

  res.render('index', { title: 'Express', username: username });
});

module.exports = router;
