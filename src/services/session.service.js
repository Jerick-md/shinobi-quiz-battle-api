
'use strict';

const sessionRepository = require('../repositories/session.repository');
const questionSetRepository = require('../repositories/question-set.repository');

const {
  unauthorized,
  forbidden,
  notFound,
  conflict,
} = require('../errors/app-error');

const { constraintOf } = require('../errors/db-errors');

// Allowed game status transitions.
const NEXT_STATUS = {
  WAITING: ['ACTIVE', 'CLOSED'],
  ACTIVE: ['CLOSED'],
  CLOSED: [],
};

// Server generates a random six-digit session code.
function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function requireUser(user) {
  if (!user) throw unauthorized();
}

function requireHost(user) {
  requireUser(user);

  if (String(user.role).toUpperCase() !== 'HOST') {
    throw forbidden('Only hosts can manage game sessions.');
  }
}

// Find a session or return 404.
async function findOrFail(code) {
  const session = await sessionRepository.findByCode(code);

  if (!session) {
    throw notFound('SESSION_NOT_FOUND', 'Game session not found.');
  }

  return session;
}

// Create a game session.
async function create(questionSetId, user) {
  requireHost(user);

  const questionSet = await questionSetRepository.findById(questionSetId);

  if (!questionSet) {
    throw notFound('QUESTION_SET_NOT_FOUND', 'Question set not found.');
  }

  if (questionSet.hostId !== user.user_id) {
    throw forbidden('This question set belongs to another host.');
  }

  // Retry only when the generated join code is already taken.
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      return await sessionRepository.create({
        sessionId: await sessionRepository.nextSessionId(),
        hostId: user.user_id,
        questionSetId,
        joinCode: randomCode(),
        status: 'WAITING',
        timeLimit: 600,
        startTime: null,
        endTime: null,
      });
    } catch (error) {
      if (constraintOf(error) !== 'uq_game_session_join_code') {
        throw error;
      }
    }
  }

  throw new Error('Could not find a free join code after 5 attempts.');
}

// Get a session using its join code.
async function getByCode(code) {
  return findOrFail(code);
}

// Change the game status according to allowed transitions.
async function changeStatus(code, status, user) {
  requireHost(user);

  const session = await findOrFail(code);

  if (session.hostId !== user.user_id) {
    throw forbidden('This game belongs to another host.');
  }

  if (!NEXT_STATUS[session.status]?.includes(status)) {
    throw conflict(
      'INVALID_STATUS_CHANGE',
      `A ${session.status} game cannot become ${status}.`
    );
  }

  const changes = { status };

  if (status === 'ACTIVE') {
    changes.startTime = new Date();
  }

  if (status === 'CLOSED') {
    changes.endTime = new Date();
  }

  return sessionRepository.update(session, changes);
}

module.exports = {
  create,
  getByCode,
  changeStatus,
  findOrFail,
};
