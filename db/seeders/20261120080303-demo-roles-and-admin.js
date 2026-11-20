'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // demo-users.js inserts lowercase roles, so fix them after it runs
    // (this matters after npm run db:reset).
    await queryInterface.sequelize.query('UPDATE users SET role = UPPER(role)');

    // One admin for local testing: needed for GET /users and promoting roles.
    await queryInterface.bulkInsert('users', [
      {
        school_id: '24179444',
        full_name: 'Tsunade',
        email: 'tsunade@example.test',
        role: 'ADMIN',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { school_id: '24179444' }, {});
  },
};