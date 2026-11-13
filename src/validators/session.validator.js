
'use strict';

const { body, param, validationResult } = require('express-validator');
const { badRequest } = require('../errors/app-error');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw badRequest(
      'VALIDATION_FAILED',
      'Please check the submitted data.',
      errors.array()
    );
  }

  next();
};

const validateCreateSession = [
  body('questionSetId')
    .isInt({ min: 1 })
    .withMessage('Question set ID must be a positive integer.')
    .toInt(),
];

const validateSessionCode = [
  param('code')
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage('Session code must contain exactly 6 digits.'),
];

const validateStatus = [
  body('status')
    .isIn(['ACTIVE', 'CLOSED'])
    .withMessage('Status must be ACTIVE or CLOSED.'),
];

const validateJoinPlayer = [
  body('nickname')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nickname must contain 2 to 50 characters.'),

  body('avatar')
    .optional()
    .isString()
    .withMessage('Avatar must be a string.')
    .isLength({ max: 100 })
    .withMessage('Avatar must not exceed 100 characters.'),
];

module.exports = {
  validate,
  validateCreateSession,
  validateSessionCode,
  validateStatus,
  validateJoinPlayer,
};
