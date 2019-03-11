const express = require('express');
const router = express.Router();

const indexControllers = require('../controllers/index')

router.get('/', indexControllers.index);

router.get('/signup', indexControllers.signupGet);

router.post('/signup', indexControllers.signupPost);

router.get('/signin', indexControllers.signinGet);

router.post('/signin', indexControllers.signinPost);

router.get('/logout', indexControllers.logout)

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
})

router.get('/profile', (req, res) => {
    res.send("holi")
})

module.exports = router;