//Home Route
module.exports.home = (req,res) => {

  let errors = null;

  res.render('home', {
    errors: errors
  });
}
