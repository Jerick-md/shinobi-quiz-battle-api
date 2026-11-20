'use strict';

const { matchedData } = require('express-validator');
const authService = require('../services/auth.service');

// matchedData keeps ONLY the fields that have a validation rule.
// There is no rule for "role" in register, so a "role" in the body is dropped here.
async function register(req, res, next) {
  try {
    const data = matchedData(req, { locations: ['body'] });
    const user = await authService.register(data);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const data = matchedData(req, { locations: ['body'] });
    const result = await authService.login(data);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

// currentUser already loaded the account from the token, so no second query.
function me(req, res) {
  res.status(200).json({ user: authService.toJson(req.account) });
}

module.exports = { register, login, me };