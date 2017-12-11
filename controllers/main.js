//This file will act as a 'controller' of sorts for the project.
//Bringing in packages
const request = require('request');
const passport = require('passport');

//Home Route 
module.exports.home = (req,res) => {

  let errors = null;

  res.render('home', {
    errors: errors
  });
}

//Home Route for posts
module.exports.results = (req, res) => {
  
  let errors = null;
  let firstName = req.body.firstName;
  console.log(firstName);

  res.render('homePost', {
    errors: errors
  })

}

module.exports.test = (req, res) => {
  let errors = null;
  res.render('test' , {
    errors: errors
  });
}
