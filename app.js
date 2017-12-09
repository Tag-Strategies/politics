const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const config = require('./config/database');
const passport = require('passport');

//Connecting to database 
mongoose.connect(config.database);
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

//passport config
require('./config/passport')(passport);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Global passport route
app.get('*', function(req,res,next){
  res.locals.user = req.user || null;
  next();
});

//Login Page 
app.get('/', (req, res) => {
  let errors = null;
  res.render('login', {
    errors: errors
  });
});

app.post('/', (req, res, next) =>{

    //Using passport to have the user login.
    passport.authenticate('local', {
      successRedirect: 'home',
      failureRedirect: '/',
      failureFlash: true
    })(req, res, next);

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

    let newUser = new User({
      username: username,
      password: password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash)=> {
          if (err){
            console.log(err);
          }
          newUser.password = hash;
          newUser.save((err) => {
            if(err){
              console.log(err);
              return;
            }else {
              req.flash('success', 'You are now registered and can log in!');
              res.redirect('/');
            }
          });
        });
    });
  }
});

//Logout 
app.get('/logout', (req, res)=> {
  req.logout();
  req.flash('success', 'You are logged out!');
  res.redirect('/');
})

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