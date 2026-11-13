'use strict';

// Guards a route.
// requireUser()                 any known account
// requireUser('HOST', 'ADMIN')  only these roles

const { unauthorized, forbidden } = require('../errors/app-error');

function requireUser(...roles) {
  return function guard(req, res, next) {
    if (!req.user) throw unauthorized();

    const userRole = String(req.user.role).toUpperCase();
    const allowedRoles = roles.map(role => String(role).toUpperCase());

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      throw forbidden(`Only these roles may do this: ${roles.join(', ')}.`);
    }

    next();
  };
}

module.exports = requireUser;