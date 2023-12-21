const express = require('express')
const router = express.Router()
const passport = require('passport');
const userCtrl = require('../controllers/user')

// GET - OAuth
router.get("/auth/google", passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
))

// GET - OAuth Callback
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    failureRedirect: '/'
  }),
  (req, res) => {
    const frontendURL = 'http://localhost:5173'
    res.redirect(`${frontendURL}/user?userData=${encodeURIComponent(JSON.stringify(req.user))}`);
  }
);

// GET - OAuth logout
router.get('/logout', (req, res) => {
  req.logout(function() {
    res.redirect('/');
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

router.get('/user', ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router