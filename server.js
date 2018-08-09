const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
// https://github.com/mysqljs/mysql
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'liftit'
});

// Initialize the app
const app = express();

// https://expressjs.com/en/guide/routing.html
app.get('/users', function (req, res) {
    connection.connect();

    connection.query('SELECT * FROM users LIMIT 0, 10', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });

    connection.end();
});
// Start the server
app.listen(3100, () => {
 console.log('Go to http://localhost:3100/users to see posts');
});