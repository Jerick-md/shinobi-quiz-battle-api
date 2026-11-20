
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint('GameSession', {
      fields: ['joinCode'],
      type: 'unique',
      name: 'uq_game_session_join_code',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'GameSession',
      'uq_game_session_join_code'
    );
  },
};
