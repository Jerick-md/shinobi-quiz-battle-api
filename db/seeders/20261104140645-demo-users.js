'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        school_id: '24179712',
        full_name: 'Itachi Uchiha',
        email: 'itachi@example.test',
        role: 'host',
      },
      {
        school_id: '24179723',
        full_name: 'Shikamaru Nara',
        email: 'shikamaru@example.test',
        role: 'player',
      },
      {
        school_id: '24179795',
        full_name: 'Rock Lee',
        email: 'rocklee@example.test',
        role: 'player',
      },
      {
        school_id: '24179111',
        full_name: 'Gaara',
        email: 'gaara@example.test',
        role: 'player',
      },
      {
        school_id: '24179221',
        full_name: 'Neji Hyuga',
        email: 'neji@example.test',
        role: 'player',
      },
      {
        school_id: '24179333',
        full_name: 'Jiraiya',
        email: 'jiraiya@example.test',
        role: 'host',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      school_id: [
        '24179712',
        '24179723',
        '24179795',
        '24179111',
        '24179221',
        '24179333',
      ],
    }, {});
  },
};