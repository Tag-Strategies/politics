const express = require('express');
const router = express.Router();

router.get('/home', ensureAuthenticated, (req, res) =>{
  User.find({}, (err, users)=>{
    if(err){
      console.log(err);
    }else {
      let errors = null;
      res.render('home', {
        errors: errors,
        users: users
      });
    }
  });
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }else {
    req.flash('danger', 'Please Login');
    res.redirect('/')
  }
}

module.exports = router;