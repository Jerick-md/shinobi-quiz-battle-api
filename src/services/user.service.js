'use strict';

const userRepository = require('../repositories/user.repository');
const { toJson } = require('./auth.service');
const { notFound, conflict } = require('../errors/app-error');

async function list() {
  const users = await userRepository.findAll();
  return users.map(toJson);
}

// actor is req.user (the admin who is calling).
async function changeRole(actor, targetId, role) {
  if (actor.user_id === targetId) {
    throw conflict('CANNOT_CHANGE_OWN_ROLE', 'An admin cannot change their own role.');
  }

  const user = await userRepository.findById(targetId);
  if (!user) {
    throw notFound('USER_NOT_FOUND', 'No account has that ID.');
  }

  const updated = await userRepository.update(user, { role });
  return toJson(updated);
}

module.exports = { list, changeRole };
