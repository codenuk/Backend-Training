const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "192.168.1.110",
  port: "3306",
  user: "root",
  password: "password",
  database: "mydb"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = connection;