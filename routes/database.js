var mysql = require('mysql');

exports.mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'database',
    debug : false,
});