const express = require('express');
const mongoose = require('mongoose');

// HTTP request logger middleware for node.js
const morgan = require('morgan');

// The bodyParser object exposes various factories to create middlewares.
// All middlewares will populate the req.body property with the parsed body
// when the Content-Type request header matches the type option
const bodyParser = require('body-parser');

// Setup Connection to the DataBase
// DeprecationWarning: current URL string parser is deprecated,
// and will be removed in a future version. To use the new parser,
// pass option { useNewUrlParser: true } to MongoClient.connect.
mongoose.connect('mongodb://localhost:27017/crud', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', error => console.log('connection error:', error.message));
db.once('open', () => console.log('Connected to MongoDB...'));


// Setup Express Application
const app = express();

// morgan( 'format' ) - Predefined Formats ( tiny, short, dev, common, combined )
// dev      : Concise output colored by response status for development use.
// common   : Standard Apache common log output
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

// bodyParser.json([options]) : Returns middleware that only parses json bodies
app.use(bodyParser.json());

// prevent CORS Errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Access, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.status(200).json({});
  }
  next();
});

// api routes
app.use('/api/items', require('./routes/items'));

// if we reached here without response, means URI is not found
app.use((req, res, next) => {
  const error = new Error('Requested URI is Not Found');
  error.status = 404;
  next(error);
});

// express `error` handling middleware, activated with: next( -error- );
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  next();
});

module.exports = app;
