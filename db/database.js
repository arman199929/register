const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "Root10000"
}).promise();

module.exports = connection;