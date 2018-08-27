const mysql = require("mysql");
const config = require("./config/config.js");

module.exports = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.db
});