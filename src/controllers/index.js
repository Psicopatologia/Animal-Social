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
        .sort({ _id: -1 })
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

const business = async (req, res) => {
    const business = await Business.find({ owner: req.app.locals.user.id });
    res.render('pages/business', { business });
};

const settings = (req, res) => { res.render('pages/settings') };

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

const profiles = (req, res, next) => {
    let userN = req.params.userName;
    User.findOne({'userName': userN}, (err, user) => {
        if (user)
            res.render('pages/profile', user);
        else
            next();
    });
}

const businessPage = async (req, res, next) => {
    let business;
    try {
        business = await Business.findById(req.params.business);
        res.render('pages/businessPage', business);      
    } catch(err) {
        next();
    }
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
    newBusiness.owner = req.app.locals.user.id;
    newBusiness.save();
    res.redirect('back');
}

const uBusiness = (req, res) => {
    Business.findByIdAndUpdate(
        req.body.id,
        {
            name: req.body.name,
            info: req.body.info,
            address: {
                city: req.body.city,
                address: req.body.address
            }
        },
        (err) => { if(err) console.log(err) }
    );
    res.redirect(`/business#${req.body.id}`);
};

const dBusiness = (req, res) => {
    Business.findByIdAndDelete(req.body.id, (err) => {
        if (err) console.log(err);
    });
    res.redirect(`/business`);
};

const events = (req, res) => {
    Business.findByIdAndUpdate(
        req.body.id,
        {
            $push: {
                events: {
                    title: req.body.title,
                    description: req.body.description,
                    date: {
                        from: new Date(req.body.dateFrom + " " + req.body.hourFrom),
                        to: new Date(req.body.dateTo + " " + req.body.hourTo)
                    },
                }
            }
        },
        (err) => { if(err) console.log(err) }
    );
    res.redirect(`/business#${req.body.id}`);
}

const dEvents = (req, res) => {
    Business.findByIdAndUpdate(
        req.body.id,
        {
            $pull: {
                events: {_id: req.body.idE}
            }
        },
        (err) => { if(err) console.log(err) }
    );
    res.redirect(`/business#${req.body.id}`);
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

const password = (req, res) => {
    User.findById (req.app.locals.user.id, (err, user) => {
        if (!user.comparePassword(req.body.oldPassword))
            req.flash('passwordMessage', 'Incorrect Password');
        else if (req.body.newPassword != req.body.newPassword2) {
            req.flash('passwordMessage', 'passwords don\'t match');
        } else {
            user.password = user.encryptPassword(req.body.newPassword)
            user.save();
        }
        res.redirect('/settings#account');
    });
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
    password,
    uBusiness,
    businessPage,
    events,
    dEvents,
    dBusiness,
}