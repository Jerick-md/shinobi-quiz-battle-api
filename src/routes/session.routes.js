
'use strict';

const { Router } = require('express');

const controller = require('../controllers/session.controller');
const rules = require('../validators/session.validator');
const requireUser = require('../middlewares/require-user');

const router = Router();

// Create a game session (HOST only).
router.post(
  '/',
  requireUser('HOST'),
  rules.validateCreateSession,
  rules.validate,
  controller.create
);

// List players in a session.
router.get(
  '/:code/players',
  rules.validateSessionCode,
  rules.validate,
  controller.listPlayers
);

// Join or rejoin a session (any authenticated account).
router.post(
  '/:code/players',
  requireUser(),
  rules.validateSessionCode,
  rules.validateJoinPlayer,
  rules.validate,
  controller.join
);

// Read a session by its six-digit code.
router.get(
  '/:code',
  rules.validateSessionCode,
  rules.validate,
  controller.get
);

// Change session status (HOST only).
router.patch(
  '/:code',
  requireUser('HOST'),
  rules.validateSessionCode,
  rules.validateStatus,
  rules.validate,
  controller.changeStatus
);

module.exports = router;
