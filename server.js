// server.js
// where your node app starts

// init project
const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

//Map global promise - get rid of worning (this came from a tutorial, I didn't actually get a warning)
mongoose.Promise = global.Promise;

//Connect to mongoose
mongoose.connect(process.env.MONGO_DEV, {
  useNewUrlParser: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//Load Idea Model
require('./models/Opportunity');
const Idea = mongoose.model('ideas');

//Load FBO Models
const Presol = mongoose.model('presol');
const Srcsgt = mongoose.model('srcsgt');
const Combine = mongoose.model('combine');

//handlebars middleware
app.engine('handlebars', exphbs(
  {defaultLayout: 'main'
  }));
app.set('view engine', 'handlebars');


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Index (home Page) Route
app.get('/', function(req, res) {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

//About Route
app.get('/about', function (req, res) {
  res.render('about');
});

//User Route
app.get('/user', function (req, res) {
  res.render('user');
});

//Model Route
app.get('/model', function (req, res) {
  res.render('model');
});

//Report Route
app.get('/report', function (req, res) {
  res.render('report');
});

//Validate Route
app.get('/validate', function (req, res) {
  res.render('validate');
});

//Workflow Route
app.get('/workflow', function (req, res) {
  res.render('workflow');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
