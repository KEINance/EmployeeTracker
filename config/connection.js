const mysql = require('mysql2');

var connection = mysql.createConnection({ 
  host: 'localhost',
  user: 'root',
  password: "AliceinWonderland1",
  database: 'employees_db',
});

connection.connect(function() {
  console.log("connected")
});

module.exports = connection