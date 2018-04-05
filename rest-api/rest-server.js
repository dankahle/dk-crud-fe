const express = require('express'),
  bodyParser = require('body-parser'),
  apiErrorHandler = require('api-error-handler'),
  userRouter = require('./user/router'),
  cors = require('cors'),
  mongoose = require('mongoose');

// Promise = require('bluebird'); // eslint-disable-line no-global-assign
// mongoose.Promise = Promise;

const mongoUri = 'mongodb://localhost/dkcrud';
mongoose.connect(mongoUri);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

const port = 3005;
const app = express()
app.use(cors());
app.use(bodyParser.json());

app.use(function tap(req, res, next) {
  console.log(`${req.method} - ${req.url}`);
  next();
})

app.use('/api/users', userRouter);

app.use(function (req, res) {
  res.status(404).send('Oops, file not found')
})
app.use(apiErrorHandler())
app.listen(port, function() {
  console.log(`listening on ${port}`);
});
