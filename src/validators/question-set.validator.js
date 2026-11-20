
'use strict';

const { body, param, validationResult } = require('express-validator');
const { badRequest } = require('../errors/app-error');

// Validate question set ID in URL parameters
const validateQuestionSetId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Question set ID must be a positive integer.'),
];


// Validate data when creating a question set
const validateCreateQuestionSet = [
  body('questionSetId')
    .exists({ checkFalsy: true })
    .withMessage('Question set ID is required.')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Question set ID must be a positive integer.'),

  body('title')
  .isString().withMessage('Title must be a string.')
  .bail()
  .trim()
  .notEmpty().withMessage('Title is required.')
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage('Title must be between 5 and 100 characters.'),

body('subject')
  .isString().withMessage('Subject must be a string.')
  .bail()
  .trim()
  .notEmpty().withMessage('Subject is required.')
  .bail()
  .isLength({ max: 100 })
  .withMessage('Subject must not exceed 100 characters.'),

  body('hostId')
    .not()
    .exists()
    .withMessage('Host ID must not be provided in the request body.'),
];

// Validate data when updating a question set
const validateUpdateQuestionSet = [
  body().custom((value) => {
    if (
      !value ||
      typeof value !== 'object' ||
      Array.isArray(value) ||
      (!Object.hasOwn(value, 'title') && !Object.hasOwn(value, 'subject'))
    ) {
      throw new Error('At least one field (title or subject) must be provided.');
    }

    return true;
  }),
  body('questionSetId')
    .not()
    .exists()
    .withMessage('Question set ID cannot be changed.'),

  body('hostId')
    .not()
    .exists()
    .withMessage('Host ID cannot be changed.'),

  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty.')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Title must not exceed 100 characters.'),

  body('subject')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Subject cannot be empty.')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Subject must not exceed 100 characters.'),
];

// Check validation results
function checkValidation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw badRequest(
      'VALIDATION_FAILED',
      'Please check the submitted data.',
      errors.array()
    );
  }

  next();
}

module.exports = {
  validateQuestionSetId,
  validateCreateQuestionSet,
  validateUpdateQuestionSet,
  checkValidation,
};
