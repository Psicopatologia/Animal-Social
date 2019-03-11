const passport = require('passport');

const index = (req, res) => {
    res.render('index', {
        title: 'Animal Social xd'
    })
};

const signupGet = (req, res) => {
    res.render('signup', {
        title: 'Signup'
    })
};

const signupPost = passport.authenticate('local_signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
});

const signinGet = (req, res) => {
    
};

const signinPost = (req, res) => {
    
};

module.exports = {
    index,
    signupGet,
    signupPost,
    signinGet,
    signinPost
}