'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query('UPDATE users SET role = UPPER(role)');
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query('UPDATE users SET role = LOWER(role)');
  },
};