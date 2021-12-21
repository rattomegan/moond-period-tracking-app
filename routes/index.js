var express = require('express');
var router = express.Router();
const passport = require('passport');



/* GET home page. */
router.get('/', function(req, res, next) {
  const dt = new Date();
  const month = dt.getMonth() + 1;
  const year = dt.getFullYear();
  res.redirect(`/periods/${month}/${year}`);
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/periods',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
