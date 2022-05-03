const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors')

const routes = require('./routes');
const helpers = require('./helpers');

const app = express();
const port = 8001;

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Password',
  database : 'statare'
});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));

routes(app, connection);

const server = app.listen(port, (error) => {
  if (error) return console.log(`[Statare Dashboard] Starting server error: ${error}`);

  connection.connect(function(err) {
    if (err) {
      return console.error('[Statare Dashboard] Database connection error: ' + err.message);
    }
    helpers.createTables(connection);
    helpers.fillTables(connection);
  });

  console.log(`[Statare Dashboard] Server is listening on port ${server.address().port}`);
});
