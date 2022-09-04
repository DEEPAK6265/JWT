const mysql = require("mysql");

let sanjeev = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_use,
    password: process.env.DB_password,
    database: process.env.DB_database,
  });
  
  sanjeev.connect((err) => {
    if (err) {
      console.log(err.sqlMessage);
    } else {
      console.log("mysql connected");
    }
  });
  module.exports = sanjeev;
  