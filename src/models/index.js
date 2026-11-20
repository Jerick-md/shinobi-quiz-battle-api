'use strict';

// ONE Sequelize instance for the whole API.
const { Sequelize, DataTypes } = require('sequelize');
const env = require('../config/env');
const dbConfig = require('../config/database')[env.nodeEnv];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// Load models
const User = require('./user')(sequelize, DataTypes);
const QuestionSet = require('./question-set')(sequelize, DataTypes);
const GameSession = require('./game-session')(sequelize, DataTypes);
const Player = require('./player')(sequelize, DataTypes);

// Associations

// User and QuestionSet
User.hasMany(QuestionSet, { foreignKey: 'hostId' });
QuestionSet.belongsTo(User, {
  foreignKey: 'hostId',
  as: 'host',
});

// User and GameSession
User.hasMany(GameSession, { foreignKey: 'hostId' });
GameSession.belongsTo(User, {
  foreignKey: 'hostId',
  as: 'host',
});

// QuestionSet and GameSession
QuestionSet.hasMany(GameSession, { foreignKey: 'questionSetId' });
GameSession.belongsTo(QuestionSet, {
  foreignKey: 'questionSetId',
  as: 'questionSet',
});

// GameSession and Player
GameSession.hasMany(Player, { foreignKey: 'sessionId' });
Player.belongsTo(GameSession, {
  foreignKey: 'sessionId',
  as: 'session',
});

// User and Player
User.hasMany(Player, { foreignKey: 'user_id' });
Player.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

// Export models
module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
  User,
  QuestionSet,
  GameSession,
  Player,
};