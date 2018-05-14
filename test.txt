'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');
const app = express();
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');


app.use(session({
	secret: 'practice_login_session'
}));


const dbOptions = {};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({
	secret: 'practice_login_session'
}));

app.use('/app', require('./routes/user'));
app.use('/app', require('./routes/todos'));
require('./config/passport')(passport);

const hostname = 'localhost';
const port = 8000;

const server = app.listen(port, hostname, () => {

  mongoose.connect("mongodb://127.0.0.1/todo_schema", dbOptions, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  
});
