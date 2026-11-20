'use strict';

const { matchedData } = require('express-validator');
const userService = require('../services/user.service');

async function list(req, res, next) {
  try {
    const users = await userService.list();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
}

async function changeRole(req, res, next) {
  try {
    const { id, role } = matchedData(req, { locations: ['params', 'body'] });
    const user = await userService.changeRole(req.user, id, role);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, changeRole };