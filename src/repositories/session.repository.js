
'use strict';

const { GameSession, Player, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

async function findAll() {
  return GameSession.findAll({
    order: [['sessionId', 'ASC']],
  });
}

async function findByCode(joinCode) {
  return GameSession.findOne({
    where: { joinCode },
  });
}

async function create(data, transaction) {
  return GameSession.create(data, { transaction });
}

async function update(session, changes) {
  return session.update(changes);
}

async function findPlayers(sessionId) {
  return Player.findAll({
    where: { sessionId },
    attributes: ['playerId', 'nickname', 'avatar', 'chakra'],
    order: [['playerId', 'ASC']],
  });
}

async function findPlayer(sessionId, userId) {
  return Player.findOne({
    where: { sessionId, user_id: userId },
  });
}

async function createPlayer(data, transaction) {
  return Player.create(data, { transaction });
}

async function generateId(model, primaryKey, transaction) {
  const result = await model.max(primaryKey, { transaction });
  return (result || 0) + 1;
}

async function nextSessionId(transaction) {
  return generateId(GameSession, 'sessionId', transaction);
}

async function nextPlayerId(transaction) {
  return generateId(Player, 'playerId', transaction);
}

async function generateJoinCode(transaction) {
  for (let attempt = 0; attempt < 20; attempt++) {
    const code = String(Math.floor(100000 + Math.random() * 900000));

    const existing = await GameSession.findOne({
      where: { joinCode: code },
      transaction,
    });

    if (!existing) return code;
  }

  throw new Error('Could not generate a unique session code.');
}

module.exports = {
  sequelize,
  findAll,
  findByCode,
  create,
  update,
  findPlayers,
  findPlayer,
  createPlayer,
  nextSessionId,
  nextPlayerId,
  generateJoinCode,
};
