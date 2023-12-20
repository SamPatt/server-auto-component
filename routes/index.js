const express = require('express')
const router = express.Router()
const passport = require('passport');
const userCtrl = require('../controllers/user')

// GET - OAuth
router.get("/auth/google", passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
))

// GET - OAuth Callback
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/user',
    failureRedirect: '/'
  }
));

// GET - OAuth logout
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});

module.exports = router