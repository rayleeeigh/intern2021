const express = require("express");
const mysql = require("mysql");

const app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sample",
  port: "3306",
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected");
  }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening to port " + port);
