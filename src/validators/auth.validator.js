'use strict';

const { body, param } = require('express-validator');

// bcrypt reads only the first 72 BYTES, so we also limit the byte length.
const PASSWORD_MAX_BYTES = 72;

const registerRules = [
  body('school_id')
    .isString()
    .withMessage('School ID must be text.')
    .trim()
    .matches(/^[0-9]{8}$/)
    .withMessage('School ID must contain exactly 8 digits.'),

  body('full_name')
    .isString()
    .withMessage('Full name must be text.')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must contain 2 to 100 characters.'),

  body('email')
    .isString()
    .withMessage('Email must be text.')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Email must not exceed 100 characters.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .toLowerCase(),

  body('password')
    .isString()
    .withMessage('Password must be text.')
    .isLength({ min: 8, max: 72 })
    .withMessage('Password must contain 8 to 72 characters.')
    .custom((value) => Buffer.byteLength(value, 'utf8') <= PASSWORD_MAX_BYTES)
    .withMessage('Password is too long.')
    .matches(/[A-Za-z]/)
    .withMessage('Password must contain at least one letter.')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number.'),

  // No rule for "role" on purpose: with matchedData(req), a "role" sent in the
  // body never reaches the service, so register always creates a PLAYER.
];

const loginRules = [
  body('school_id')
    .isString()
    .withMessage('School ID must be text.')
    .trim()
    .notEmpty()
    .withMessage('School ID is required.'),

  body('password')
    .isString()
    .withMessage('Password must be text.')
    .notEmpty()
    .withMessage('Password is required.'),
];

const roleRules = [
  body('role')
    .isIn(['PLAYER', 'HOST', 'ADMIN'])
    .withMessage('Role must be PLAYER, HOST or ADMIN.'),
];

const idParam = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer.')
    .toInt(),
];

module.exports = { registerRules, loginRules, roleRules, idParam };