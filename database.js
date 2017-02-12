var mysql = require('mysql');

exports.mysqlConnection = mysql.createConnection({
    host     : '146.185.168.186',
    user     : 'user',
    password : 'qwerty',
    database : 'user',
    debug : false,
});