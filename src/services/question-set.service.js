
'use strict';

const questionSetRepository = require('../repositories/question-set.repository');
const {
  unauthorized,
  forbidden,
  notFound,
} = require('../errors/app-error');

function requireHost(user) {
  if (!user) {
    throw unauthorized();
  }

  if (String(user.role).toUpperCase() !== 'HOST') {
    throw forbidden('Only hosts can manage question sets.');
  }
}

async function listQuestionSets(user) {
  requireHost(user);

  return questionSetRepository.findAllByHost(user.user_id);
}

async function getQuestionSetById(id, user) {
  requireHost(user);

  const questionSet = await questionSetRepository.findById(id);

  if (!questionSet || questionSet.hostId !== user.user_id) {
    throw notFound('QUESTION_SET_NOT_FOUND', 'Question set not found.');
  }

  return questionSet;
}

async function createQuestionSet(data, user) {
  requireHost(user);

  return questionSetRepository.create({
    ...data,
    hostId: user.user_id,
  });
}

async function updateQuestionSet(id, changes, user) {
  const questionSet = await getQuestionSetById(id, user);

  await questionSetRepository.update(questionSet, changes);

  return questionSet;
}

async function deleteQuestionSet(id, user) {
  const questionSet = await getQuestionSetById(id, user);

  await questionSetRepository.remove(questionSet);
}

module.exports = {
  listQuestionSets,
  getQuestionSetById,
  createQuestionSet,
  updateQuestionSet,
  deleteQuestionSet,
};
