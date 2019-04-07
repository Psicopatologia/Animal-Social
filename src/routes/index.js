const express = require('express');
const router = express.Router();

const indexControllers = require('../controllers/index')

router.get('/', indexControllers.index);

router.get('/:page', indexControllers.index);

router.get('/lang/:lang', indexControllers.lang);

router.get('/signup', indexControllers.signupGet);

router.post('/signup', indexControllers.signupPost);

router.get('/signin', indexControllers.signinGet);

router.post('/signin', indexControllers.signinPost);

router.get('/logout', indexControllers.logout);

router.get('/u/:userName', indexControllers.profiles);

router.get('/settings', isAuth, indexControllers.settings);

router.get('/business', isAuth, indexControllers.business);

router.post('/business', indexControllers.businessPost);

router.post('/profile', indexControllers.profilePost);

function isAuth(req,res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = router;