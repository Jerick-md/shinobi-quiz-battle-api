
'use strict';

const { Player } = require('../models');

// Find an existing player seat for the same account in a session.
function findBySessionAndUser(sessionId, userId, transaction) {
  return Player.findOne({
    where: {
      sessionId,
      user_id: userId,
    },
    transaction,
  });
}

// Find a nickname already used in the same session.
function findBySessionAndNickname(sessionId, nickname, transaction) {
  return Player.findOne({
    where: {
      sessionId,
      nickname,
    },
    transaction,
  });
}

// Get all players in a session.
function findAllBySession(sessionId) {
  return Player.findAll({
    where: { sessionId },
    attributes: ['nickname', 'chakra'],
    order: [['playerId', 'ASC']],
  });
}

// Create a new player seat.
function create(data, transaction) {
  return Player.create(data, { transaction });
}

// Generate the next player ID.
async function nextId(transaction) {
  const maxId = await Player.max('playerId', { transaction });
  return (maxId || 0) + 1;
}

module.exports = {
  findBySessionAndUser,
  findBySessionAndNickname,
  findAllBySession,
  create,
  nextId,
};
