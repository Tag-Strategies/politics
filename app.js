const express = require('express');
const path = require('path');

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


//Start Server 
app.listen(3000, () => {
  console.log('Server started on port 3000!')
})