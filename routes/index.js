var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var array = [];
  array.push(req.cookies.data);
  res.render('index', { title: 'Express', username: req.cookies.username, data: array });
});

module.exports = router;
