var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //TODO: show a proper welcome screen with links to login or register
  res.render('index', { title: 'Express' });
});

module.exports = router;
