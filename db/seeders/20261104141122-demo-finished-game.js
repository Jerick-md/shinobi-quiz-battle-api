
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Find the host account created by demo-users.
    const db = queryInterface.sequelize;

    const [[host]] = await db.query(`
      SELECT user_id
      FROM users
      WHERE school_id = '24179712'
    `);

    const [[player1]] = await db.query(`
      SELECT user_id FROM users WHERE school_id = '24179723'
    `);

    const [[player2]] = await db.query(`
      SELECT user_id FROM users WHERE school_id = '24179795'
    `);

    const [[player3]] = await db.query(`
      SELECT user_id FROM users WHERE school_id = '24179111'
    `);

    const [[player4]] = await db.query(`
      SELECT user_id FROM users WHERE school_id = '24179333'
    `);

    if (!host || !player1 || !player2 || !player3 || !player4) {
      throw new Error('Run the demo-users seeder before this seeder.');
    }

    // Question set.
    await queryInterface.bulkInsert('QuestionSet', [
      {
        questionSetId: 1,
        hostId: host.user_id,
        title: 'Shinobi Challenge',
        subject: 'Naruto Knowledge',
      },
    ]);

    // Game sessions.
    await queryInterface.bulkInsert('GameSession', [
      {
        sessionId: 1,
        hostId: host.user_id,
        questionSetId: 1,
        joinCode: '638251',
        status: 'CLOSED',
        timeLimit: 600,
        startTime: new Date('2026-10-10T01:00:00Z'),
        endTime: new Date('2026-10-10T01:10:00Z'),
      },
      {
        sessionId: 2,
        hostId: host.user_id,
        questionSetId: 1,
        joinCode: '729415',
        status: 'WAITING',
        timeLimit: 600,
        startTime: null,
        endTime: null,
      },
    ]);

    // Four players.
    await queryInterface.bulkInsert('Player', [
      {
        playerId: 1,
        sessionId: 1,
        user_id: player1.user_id,
        nickname: 'Shikamaru',
        avatar: 'shikamaru',
        chakra: 35,
      },
      {
        playerId: 2,
        sessionId: 1,
        user_id: player2.user_id,
        nickname: 'RockLee',
        avatar: 'rocklee',
        chakra: 25,
      },
      {
        playerId: 3,
        sessionId: 1,
        user_id: player3.user_id,
        nickname: 'Gaara',
        avatar: 'gaara',
        chakra: 15,
      },
      {
        playerId: 4,
        sessionId: 1,
        user_id: player4.user_id,
        nickname: 'Neji',
        avatar: 'neji',
        chakra: 10,
      },
    ]);

    // Five Naruto-themed questions.
    await queryInterface.bulkInsert('Question', [
      {
        questionId: 1,
        questionSetId: 1,
        text: 'Who is known as the Copy Ninja?',
        type: 'multiple-choice',
        correctIndex: 0,
        timeLimit: 20,
      },
      {
        questionId: 2,
        questionSetId: 1,
        text: 'What village does Naruto Uzumaki belong to?',
        type: 'multiple-choice',
        correctIndex: 0,
        timeLimit: 20,
      },
      {
        questionId: 3,
        questionSetId: 1,
        text: 'Who is Naruto’s rival and teammate?',
        type: 'multiple-choice',
        correctIndex: 0,
        timeLimit: 20,
      },
      {
        questionId: 4,
        questionSetId: 1,
        text: 'What is the name of Naruto’s signature technique?',
        type: 'multiple-choice',
        correctIndex: 0,
        timeLimit: 20,
      },
      {
        questionId: 5,
        questionSetId: 1,
        text: 'What is the highest rank awarded to a village leader?',
        type: 'multiple-choice',
        correctIndex: 0,
        timeLimit: 20,
      },
    ]);

    // Players 1-3 answered all five questions.
    // Player 4 answered only two questions.
    const answers = [];

    const answerSets = [
      { playerId: 1, count: 5 },
      { playerId: 2, count: 5 },
      { playerId: 3, count: 5 },
      { playerId: 4, count: 2 },
    ];

    for (const item of answerSets) {
      for (let questionId = 1; questionId <= item.count; questionId++) {
        answers.push({
          answerId: answers.length + 1,
          playerId: item.playerId,
          questionId,
          selectedIndex: 0,
          isCorrect: true,
          submittedAt: new Date('2026-10-10T01:01:00Z'),
        });
      }
    }

    await queryInterface.bulkInsert('Answer', answers);

    // Reward rounds.
    await queryInterface.bulkInsert('RewardRound', [
      {
        rewardRoundId: 1,
        playerId: 1,
        duration: 5,
        chakraEarned: 25,
      },
      {
        rewardRoundId: 2,
        playerId: 2,
        duration: 5,
        chakraEarned: 15,
      },
      {
        rewardRoundId: 3,
        playerId: 3,
        duration: 5,
        chakraEarned: 10,
      },
    ]);

    // Naruto-themed reward objects.
    await queryInterface.bulkInsert('RewardObject', [
      {
        rewardId: 1,
        rewardRoundId: 1,
        objectType: 'chakra_orb',
        chakraChange: 25,
      },
      {
        rewardId: 2,
        rewardRoundId: 2,
        objectType: 'ryo_pouch',
        chakraChange: 10,
      },
      {
        rewardId: 3,
        rewardRoundId: 3,
        objectType: 'explosive_kunai',
        chakraChange: -10,
      },
    ]);
  },

  async down(queryInterface) {
    // Delete reward objects.
    await queryInterface.bulkDelete('RewardObject', {
      rewardRoundId: [1, 2, 3],
    }, {});

    // Delete reward rounds.
    await queryInterface.bulkDelete('RewardRound', {
      rewardRoundId: [1, 2, 3],
    }, {});

    // Delete answers.
    await queryInterface.bulkDelete('Answer', {
      answerId: {
        [require('sequelize').Op.between]: [1, 17],
      },
    }, {});

    // Delete questions.
    await queryInterface.bulkDelete('Question', {
      questionId: [1, 2, 3, 4, 5],
    }, {});

    // Delete players.
    await queryInterface.bulkDelete('Player', {
      playerId: [1, 2, 3, 4],
    }, {});

    // Delete both game sessions.
    await queryInterface.bulkDelete('GameSession', {
      sessionId: [1, 2],
    }, {});

    // Delete question set.
    await queryInterface.bulkDelete('QuestionSet', {
      questionSetId: 1,
    }, {});
  },
};
