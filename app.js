const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

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

//Load view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Setting up public folder 
app.use(express.static(path.join(__dirname, 'public')));

//Login Page 
app.get('/', (req, res) => {
  res.render('login');
});

//Sign Up page 
app.get('/signup', (req, res) => {
  res.render('signup');
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
  
})


//Start Server 
app.listen(3000, () => {
  console.log('Server started on port 3000!')
})