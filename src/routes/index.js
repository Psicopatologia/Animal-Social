const express = require('express');
const router = express.Router();

const indexControllers = require('../controllers/index')

router.get('/', indexControllers.index);

router.get('/signup', indexControllers.signupGet);

router.post('/signup', indexControllers.signupPost);

router.get('/signin', indexControllers.signinPost);

router.post('/signin', indexControllers.signinPost);

module.exports = router;