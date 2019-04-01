const User = require('../models/User');
const Business = require('../models/Business');
const passport = require('passport');

// Get
const index = (req, res) => {
    let perPage = 12;
    page = req.params.page || 1;

    Business
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, business) => {
            Business.estimatedDocumentCount().exec((err, count) => {
                if (err) console.log(err);
                res.render('pages/index', {
                    business: business,
                    current: page,
                    pages: Math.ceil(count / perPage),
                });
            });
        });
};

const signupGet = (req, res) => { res.render('pages/signup') };

const signinGet = (req, res) => { res.render('pages/signin'); };

const business = (req, res) => { res.render('pages/business') };

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

const profiles = (req, res, next) => {
    let userN = req.params.userName;
    User.findOne({'userName': userN}, 'email name', (err, user) => {
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

const businessPost = (req, res) => {
    const newBusiness = new Business();
    newBusiness.name = req.body.name;
    newBusiness.info = req.body.info;
    newBusiness.address.city = req.body.city;
    newBusiness.address.address = req.body.address;
    newBusiness.save();
    res.redirect('/');
}

module.exports = {
    index,
    signupGet,
    signupPost,
    signinGet,
    signinPost,
    logout,
    profiles,
    business,
    businessPost
}