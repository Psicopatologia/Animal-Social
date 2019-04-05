const express = require('express');
const routes = require('./routes/index');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const i18n = require('i18n');

// Initializations
const app = express();
require('./database');
require('./passport/local_auth');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
i18n.configure({
    locales:['en', 'es'],
    defaultLocale: 'en',
    cookie: 'lang',
    directory: path.join(__dirname, 'locales'),
});

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'AnimalSocialSessionXD',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(i18n.init);
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});

// Routes
app.use(routes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')} :D`)
})