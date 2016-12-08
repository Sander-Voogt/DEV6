var mysql = require('mysql');

exports.mysqlConnection = mysql.createConnection({
    host     : '146.185.138.10',
    user     : 'user',
    password : 'qwerty',
    database : 'user',
    debug : false,
});