var mysql = require('mysql');

exports.mysqlConnection = mysql.createConnection({
    host     : '188.226.137.109',
    user     : 'user',
    password : 'qwerty',
    database : 'user',
    debug : false,
});