const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ir0cky00",
  database: "bucket_besties_db"
});

module.exports = connection