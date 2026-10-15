'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        school_id: '24179712',
        full_name: 'Kakashi Hatake',
        email: 'hatakekakashi@example.test',
        role: 'host',
      },
      {
        school_id: '24179723',
        full_name: 'Hinata Hyuga',
        email: 'hyugahinata@example.test',
        role: 'player',
      },
      {
        school_id: '24179795',
        full_name: 'Naruto Uzumaki',
        email: 'naruto@example.test',
        role: 'player',
      },
      {
        school_id: '24179111',
        full_name: 'Sasuke Uchiha',
        email: 'uchihasasuke@example.test',
        role: 'player',
      },
      {
        school_id: '24179221',
        full_name: 'Sakura Haruno',
        email: 'harunosakura@example.test',
        role: 'player',
      },
      {
        school_id: '24179333',
        full_name: 'Tsunade Senju',
        email: 'senjutsunade@example.test',
        role: 'host',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
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
  }
};
