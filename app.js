const express = require('express');
const path = require('path');

//Init App
const app = express();

//Load view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Home Route
app.get('/', (req, res) => {
  res.render('index', {
    title: "Hello World"
  });
});

//

//Start Server 
app.listen(3000, () => {
  console.log('Server started on port 3000!')
})