const User = require('../models/User');
const Business = require('../models/Business');
const passport = require('passport');

// Get
const index = (req, res, next) => {
    let perPage = 12
    if (req.params.page) {
        if (isNaN(req.params.page)) {
            return next()
        };
    }
    let page = req.params.page || 1;
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

const lang = (req, res) => {
    let lang = req.params.lang;
    res.cookie('lang', lang, {expires: new Date(253402300000000)});
    res.redirect('back');
};

const signupGet = (req, res) => { res.render('pages/signup') };

const signinGet = (req, res) => { res.render('pages/signin'); };

const business = (req, res) => { res.render('pages/business') };

const settings = (req, res) => { res.render('pages/settings') };

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

const profilePost = (req, res) => {
    User.findByIdAndUpdate(
        req.app.locals.user.id,
        {
            name: req.body.name,
            bio: req.body.bio
        },
        (err) => { if(err) console.log(err) }
    );
    res.redirect('back');
}

const businessPost = (req, res) => {
    const newBusiness = new Business();
    newBusiness.name = req.body.name;
    newBusiness.info = req.body.info;
    newBusiness.address.city = req.body.city;
    newBusiness.address.address = req.body.address;
    newBusiness.save();
    User.findByIdAndUpdate(
        req.app.locals.user.id,
        { $push: { business: { businessId: newBusiness.id} } },
        { safe: true, upsert: true },
        (err) => { console.log(err) }
    );
    res.redirect('back');
}

const username = (req, res) => {
    let username = req.body.username;
    User.findOne({$or: [{userName: username}, {id: username}]}, (err, user) => {
        if (user) {
            req.flash('usernameMessage', 'the username is already in use');
        } else {
            User.findByIdAndUpdate(
                req.app.locals.user.id,
                { userName: username },
                (err) => { if(err) console.log(err) }
            );
        }
    });
    res.redirect('/settings#account');
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
    businessPost,
    lang,
    settings,
    profilePost,
    username,
}