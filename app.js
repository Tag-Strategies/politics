const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
// const bcrypt  = require('bcryptjs');
// const config = require('./config/database');
// const passport = require('passport');

//Connecting to database 
mongoose.connect('mongodb://localhost/politics');
let db = mongoose.connection;

//Checking connection
db.once('open', () =>{
  console.log('Connected to MongoDB!');
})

//Checking for DB errors
db.on('error', (err) => {
  console.log(err);
});

//Bringing in the model
let User = require('./models/user');

//Init App
const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Load view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Setting up public folder 
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


//Express validation middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Login Page 
app.get('/', (req, res) => {
  let errors = null;
  res.render('login', {
    errors: errors
  });
});

//Sign Up page 
app.get('/signup', (req, res) => {
  let errors = null;
  res.render('signup', {
    errors: errors
  });
});

app.post('/signup', (req, res)=> {

  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password2', 'passwords do not match').equals(req.body.password);

  //Getting errors
  let errors = req.validationErrors();

  if (errors){
    res.render('signup', {
      errors: errors
    });
  }else {

    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save( (err)=>{
      if (err){
        console.log(err);
        return
      }else {
        req.flash('success', 'User Added!')
        res.redirect('/');
      }
    });
  }
});

//Home Page 
app.get('/home', (req, res) =>{
  User.find({}, (err, users)=>{
    if(err){
      console.log(err);
    }else {
      res.render('home', {
        users: users
      });
    }
  });
});


//Start Server 
app.listen(3000, () => {
  console.log('Server started on port 3000!')
})