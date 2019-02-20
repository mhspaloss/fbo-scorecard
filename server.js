// server.js
// where your node app starts

// init project
const express = require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//TRead JSON from GitHub repo
const request = require('request');


//Map global promise - get rid of warning (this came from a tutorial, I didn't actually get a warning)
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

//Handlebars Middleware
app.engine('handlebars', exphbs(
  {defaultLayout: 'main'
  }));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));


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

//Idea Index Page
app.get('/ideas', function (req, res) {
  Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
      res.render('ideas', {
        ideas:ideas
    });
  });
});

//Add Idea Route
app.get('/ideas/add', function (req, res) {
  res.render('ideas/add');
});

//Edit Idea Route
app.get('/ideas/edit/:id', function (req, res) {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    res.render('ideas/edit',{
      idea:idea
    });
  }); 
});

//Process Form
app.post('/ideas', function (req, res) {
  let errors = [];
  
  if(!req.body.title) {
  errors.push({text: 'Please add a title'});
  }
  if(!req.body.details) {
  errors.push({text: 'Please add some details'});
  }
  
  if(errors.length > 0){
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
    title: req.body.title,
    details: req.body.details
    }
    new Idea(newUser)
    .save()
    .then(idea => {
      res.redirect('ideas');
    })
  }
});

//Edit Form Process
app.put('/ideas/:id', function (req, res) {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
  //New values
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save()
      .then(idea => {
        res.redirect('/ideas');
    })
  });
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
  const title = 'Validate Opportunity';
  res.render('validate', {
    title: title
  });
});

//Workflow Route
app.get('/workflow', function (req, res) {
  res.render('workflow');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
