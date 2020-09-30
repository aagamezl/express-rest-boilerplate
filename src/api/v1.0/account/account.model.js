const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Business', 'Personal'),
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  })

  Account.associate = models => {
    Account.belongsToMany(
      models.User,
      {
        through: models.AccountUser,
        foreignKey: 'accountId',
        as: 'users'
      }
    )

    Account.hasOne(
      models.Billing,
      { foreignKey: 'accountId', as: 'billing' }
    )
  }

  return Account
}
