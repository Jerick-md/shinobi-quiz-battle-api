'use strict';

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Player',
    {
      playerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      chakra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'Player',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['sessionId', 'nickname'],
          name: 'uq_player_session_nickname',
        },
        {
          unique: true,
          fields: ['sessionId', 'user_id'],
          name: 'uq_player_session_user',
        },
      ],
    }
  );