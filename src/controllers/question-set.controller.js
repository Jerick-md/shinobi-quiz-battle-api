
'use strict';

const { matchedData } = require('express-validator');

const questionSetService = require('../services/question-set.service');

// Fields that the client is allowed to see.
function toJson(questionSet) {
  return {
    questionSetId: questionSet.questionSetId,
    title: questionSet.title,
    subject: questionSet.subject,
    hostId: questionSet.hostId,
  };
}

// GET all question sets owned by the current host
async function list(req, res) {
  const questionSets = await questionSetService.listQuestionSets(req.user);

  res.status(200).json(questionSets.map(toJson));
}

// GET one question set
async function get(req, res) {
  const { id } = matchedData(req, { locations: ['params'] });

  const questionSet = await questionSetService.getQuestionSetById(id, req.user);

  res.status(200).json(toJson(questionSet));
}

// CREATE a question set
async function create(req, res) {
  const data = matchedData(req, { locations: ['body'] });

  const questionSet = await questionSetService.createQuestionSet(data, req.user);

  res.status(201).json(toJson(questionSet));
}

// UPDATE a question set
async function update(req, res) {
  const { id } = matchedData(req, { locations: ['params'] });
  const changes = matchedData(req, { locations: ['body'] });

  const questionSet = await questionSetService.updateQuestionSet(
    id,
    changes,
    req.user
  );

  res.status(200).json(toJson(questionSet));
}

// DELETE a question set
async function remove(req, res) {
  const { id } = matchedData(req, { locations: ['params'] });

  await questionSetService.deleteQuestionSet(id, req.user);

  res.status(204).end();
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
};
