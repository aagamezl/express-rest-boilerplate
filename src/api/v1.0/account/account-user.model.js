const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const AccountUser = sequelize.define('AccountUser', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  })

  AccountUser.associate = models => {
    AccountUser.belongsTo(models.Account, { foreignKey: 'accountId' })
    AccountUser.belongsTo(models.User, { foreignKey: 'userId' })
  }

  return AccountUser
}
