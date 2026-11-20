
'use strict';

const { Router } = require('express');

const controller = require('../controllers/question-set.controller');
const rules = require('../validators/question-set.validator');

const router = Router();

// GET all question sets
router.get('/', controller.list);

// CREATE a question set
router.post(
  '/',
  rules.validateCreateQuestionSet,
  rules.checkValidation,
  controller.create
);

// GET one question set
router.get(
  '/:id',
  rules.validateQuestionSetId,
  rules.checkValidation,
  controller.get
);

// UPDATE a question set
router.patch(
  '/:id',
  rules.validateQuestionSetId,
  rules.validateUpdateQuestionSet,
  rules.checkValidation,
  controller.update
);

// DELETE a question set
router.delete(
  '/:id',
  rules.validateQuestionSetId,
  rules.checkValidation,
  controller.remove
);

module.exports = router;
