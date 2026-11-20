'use strict';

const bcrypt = require('bcryptjs');

// Your own demo password: 8 to 72 characters, with a letter and a number.
const DEMO_PASSWORD = 'Shinobi2026Demo';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
    // Only accounts that have no password yet.
    await queryInterface.bulkUpdate(
      'users',
      { password_hash: hash },
      { password_hash: null }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkUpdate('users', { password_hash: null }, {});
  },
};