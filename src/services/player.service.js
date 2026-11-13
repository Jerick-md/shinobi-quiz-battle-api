
'use strict';

const playerRepository = require('../repositories/player.repository');
const sessionService = require('./session.service');

const {
  unauthorized,
  conflict,
} = require('../errors/app-error');

const { constraintOf } = require('../errors/db-errors');

async function join(code, data, user) {
  if (!user) throw unauthorized();

  const session = await sessionService.findOrFail(code);

  // 1. Check existing player FIRST.
  // Existing players can rejoin even if the game is ACTIVE or CLOSED.
  const existingPlayer = await playerRepository.findBySessionAndUser(
    session.sessionId,
    user.user_id
  );

  if (existingPlayer) {
    return {
      session,
      player: existingPlayer,
      created: false,
    };
  }

  // 2. Only new players are subject to the session status.
  if (session.status === 'CLOSED') {
    throw conflict('SESSION_ENDED', 'This game session has ended.');
  }

  if (session.status !== 'WAITING') {
    throw conflict(
      'SESSION_NOT_JOINABLE',
      'This game session is no longer accepting new players.'
    );
  }

  // 3. Check nickname uniqueness.
  const duplicateNickname =
    await playerRepository.findBySessionAndNickname(
      session.sessionId,
      data.nickname
    );

  if (duplicateNickname) {
    throw conflict(
      'NICKNAME_TAKEN',
      'This nickname is already used in this game session.'
    );
  }

  // 4. Create the player seat.
  const playerId = await playerRepository.nextId();

  try {
    const player = await playerRepository.create({
      playerId,
      sessionId: session.sessionId,
      user_id: user.user_id,
      nickname: data.nickname,
      avatar: data.avatar || null,
      chakra: 0,
    });

    return {
      session,
      player,
      created: true,
    };
  } catch (error) {
    // 5. Handle database unique-constraint conflicts.
    const constraint = constraintOf(error);

    if (constraint === 'uq_player_session_user') {
      const player = await playerRepository.findBySessionAndUser(
        session.sessionId,
        user.user_id
      );

      if (player) {
        return {
          session,
          player,
          created: false,
        };
      }
    }

    if (constraint === 'uq_player_session_nickname') {
      throw conflict(
        'NICKNAME_TAKEN',
        'This nickname is already used in this game session.'
      );
    }

    throw error;
  }
}

async function listBySession(code) {
  const session = await sessionService.findOrFail(code);

  return playerRepository.findAllBySession(session.sessionId);
}

module.exports = {
  join,
  listBySession,
};
