const User = require('../models/User');
const passport = require('passport');

// Get
const index = (req, res) => { res.render('pages/index') };

const signupGet = (req, res) => { res.render('pages/signup') };

const signinGet = (req, res) => { res.render('pages/signin'); };

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

const profiles = (req, res, next) => {
    let userN = req.params.userName;
    User.findOne({'userName': userN}, 'email', (err, user) => {
        if (user)
            res.render('pages/profile', user);
        else
            next();
    });
}

// Post
const signupPost = passport.authenticate('local_signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
});

const signinPost = passport.authenticate('local_signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    passReqToCallback: true
});

module.exports = {
    index,
    signupGet,
    signupPost,
    signinGet,
    signinPost,
    logout,
    profiles
}