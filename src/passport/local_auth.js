const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local_signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (user) {
        return done(null, false, req.flash('signupMessage',
            'The email is already registered.'))
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.userName = newUser.id;
        newUser.name = req.body.name;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        newUser.password = undefined;
        done(null, newUser);
    }

}));

passport.use('local_signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'No User Found'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }
    user.password = undefined;
    return done(null, user);
}));