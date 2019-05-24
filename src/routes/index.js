const express = require('express');
const router = express.Router();
const indexControllers = require('../controllers/index')

// Get 
router.get('/', indexControllers.index);

router.get('/lang/:lang', indexControllers.lang);

router.get('/signup', indexControllers.signupGet);

router.get('/signin', indexControllers.signinGet);

router.get('/logout', indexControllers.logout);

router.get('/u/:userName', indexControllers.profiles);

router.get('/b', indexControllers.showBusiness);

router.get('/b/:page', indexControllers.showBusiness);

router.get('/b/:business', indexControllers.businessPage);

router.get('/settings', isAuth, indexControllers.settings);

router.get('/business', isAuth, indexControllers.business);

// Post
router.post('/signup', indexControllers.signupPost);

router.post('/signin', indexControllers.signinPost);

router.post('/business', indexControllers.businessPost);

router.post('/uBusiness', indexControllers.uBusiness);

router.post('/dBusiness', indexControllers.dBusiness);

router.post('/events', indexControllers.events);

router.post('/dEvents', indexControllers.dEvents);

router.post('/profile', indexControllers.profilePost);

router.post('/username', indexControllers.username);

router.post('/password', indexControllers.password);

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = router;