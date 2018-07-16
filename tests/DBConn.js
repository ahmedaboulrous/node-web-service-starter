const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/crud-tests');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// Global Before - before all tests, before everything
before((done) => {
  db.once('open', () => {
    console.log('>> Connection to MongoDB ... Established');
    done();
  });
});


// Global After - after all tests, after everything
after((done) => {
  db.close().then(() => {
    console.log('>> Connection to MongoDB ... Terminated');
    done();
  });
});
