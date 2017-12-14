const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  req.flash('error', 'Oops you must be logged in to do that!');
  res.redirect('/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.tags.includes("admin")) return next();
  req.flash('error', 'not allowed to see this page');
  res.redirect('/');
};

exports.isTeacher = (req, res, next) => {
  if (req.user && req.user.tags.includes("teacher")) return next();
  req.flash('error', 'not allowed to see this page');
  res.redirect('/');
};