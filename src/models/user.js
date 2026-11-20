// Model = the JavaScript view of ONE table.
// Column rules live in the migration.

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      school_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'PLAYER',
      },
      password_hash: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
    },
    {
      tableName: 'users',
      timestamps: false,
      // Week 12: the hash never leaves the database by accident.
      // Only the login query asks for it, with User.scope('withPassword').
      defaultScope: { attributes: { exclude: ['password_hash'] } },
      scopes: { withPassword: { attributes: { include: ['password_hash'] } } },
    }
  );