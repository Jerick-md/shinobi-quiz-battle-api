'use strict';

const { Router } = require('express');

const controller = require('../controllers/auth.controller');
const rules = require('../validators/auth.validator');
const { validate } = require('../validators/session.validator');
const requireUser = require('../middlewares/require-user');

const router = Router();

// Create a new account. Always a PLAYER, whatever the body says.
router.post('/register', rules.registerRules, validate, controller.register);

// Log in with school ID and password. Answers with a token.
router.post('/login', rules.loginRules, validate, controller.login);

// Who am I? Any logged-in account.
router.get('/me', requireUser(), controller.me);

module.exports = router;