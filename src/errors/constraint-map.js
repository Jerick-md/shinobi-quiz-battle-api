
'use strict';

// Maps PostgreSQL constraint names to client-friendly errors.
module.exports = {
  // UNIQUE constraints
  users_email_key: {
    status: 409,
    code: 'EMAIL_ALREADY_EXISTS',
    message: 'This email address is already registered.',
  },

  users_school_id_key: {
    status: 409,
    code: 'SCHOOL_ID_ALREADY_EXISTS',
    message: 'This school ID is already registered.',
  },

  uq_game_session_join_code: {
    status: 409,
    code: 'JOIN_CODE_ALREADY_EXISTS',
    message: 'This game join code is already in use.',
  },

  uq_player_session_nickname: {
    status: 409,
    code: 'NICKNAME_TAKEN',
    message: 'That nickname is already used in this game.',
  },

  // FOREIGN KEY constraints
  'QuestionSet_hostId_fkey': {
    status: 409,
    code: 'HOST_HAS_QUESTION_SETS',
    message: 'This host is referenced by a question set.',
  },

  'GameSession_hostId_fkey': {
    status: 409,
    code: 'HOST_HAS_GAME_SESSIONS',
    message: 'This host is referenced by a game session.',
  },

  'GameSession_questionSetId_fkey': {
    status: 409,
    code: 'QUESTION_SET_IN_USE',
    message: 'This question set is used by a game session and cannot be deleted.',
  },

  'Player_sessionId_fkey': {
    status: 409,
    code: 'SESSION_HAS_PLAYERS',
    message: 'This game session still has player records.',
  },

  'Player_user_id_fkey': {
    status: 409,
    code: 'USER_HAS_PLAYER_RECORDS',
    message: 'This user is referenced by a player record.',
  },
};
