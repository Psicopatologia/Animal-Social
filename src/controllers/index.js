const passport = require('passport');

const index = (req, res) => {
    res.render('pages/index')
};

const signupGet = (req, res) => {
    res.render('pages/signup')
};

const signupPost = passport.authenticate('local_signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
});

const signinGet = (req, res) => {
    res.render('pages/signin');
};

const signinPost = passport.authenticate('local_signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    passReqToCallback: true
});

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

const profile = (req, res) => {
    res.redirect('pages/profile')
}

module.exports = {
    index,
    signupGet,
    signupPost,
    signinGet,
    signinPost,
    logout,
    profile
}