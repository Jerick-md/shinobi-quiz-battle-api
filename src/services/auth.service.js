'use strict';

const userRepository = require('../repositories/user.repository');
const password = require('../security/password');
const token = require('../security/token');
const { unauthorized, conflict } = require('../errors/app-error');

// The ONLY shape of a user that leaves the API. It never includes password_hash.
function toJson(user) {
  return {
    user_id: user.user_id,
    school_id: user.school_id,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
  };
}

// "data" must come from matchedData(req), so a "role" in the body never gets here.
async function register({ school_id, full_name, email, password: plain }) {
  const existing = await userRepository.findBySchoolId(school_id);
  if (existing) {
    throw conflict('SCHOOL_ID_TAKEN', 'That school ID is already registered.');
  }

  try {
    const user = await userRepository.create({
      school_id,
      full_name,
      email,
      role: 'PLAYER', // register ALWAYS creates a PLAYER
      password_hash: await password.hash(plain),
    });
    return toJson(user);
  } catch (err) {
    // Two requests at the same moment can both pass the check above:
    // the database UNIQUE rule is the last line of defence.
    if (err.name === 'SequelizeUniqueConstraintError') {
      const fields = (err.errors || []).map((e) => e.path);
      if (fields.includes('email')) {
        throw conflict('EMAIL_TAKEN', 'That email is already registered.');
      }
      throw conflict('SCHOOL_ID_TAKEN', 'That school ID is already registered.');
    }
    throw err;
  }
}

async function login({ school_id, password: plain }) {
  const user = await userRepository.findForLogin(school_id);

  // Same call, same time, same error for an unknown ID and a wrong password.
  const ok = await password.matches(plain, user ? user.password_hash : null);
  if (!user || !ok) {
    throw unauthorized('Wrong school ID or password.', 'INVALID_CREDENTIALS');
  }

  const signed = token.issue(user);
  const payload = token.verify(signed);

  return {
    token: signed,
    token_type: 'Bearer',
    expires_in: payload.exp - payload.iat, // seconds
    user: toJson(user),
  };
}

async function getMe(userId) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw unauthorized('This account no longer exists.', 'AUTH_REQUIRED');
  }
  return toJson(user);
}

module.exports = { register, login, getMe, toJson };