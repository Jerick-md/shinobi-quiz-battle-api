'use strict';

const { Router } = require('express');

const controller = require('../controllers/user.controller');
const rules = require('../validators/auth.validator');
const { validate } = require('../validators/session.validator');
const requireUser = require('../middlewares/require-user');

const router = Router();

// Every route below is for ADMIN only. The guard runs before any validation,
// so a stranger learns nothing about our rules.
router.use(requireUser('ADMIN'));

router.get('/', controller.list);

router.patch('/:id/role', rules.idParam, rules.roleRules, validate, controller.changeRole);

module.exports = router;