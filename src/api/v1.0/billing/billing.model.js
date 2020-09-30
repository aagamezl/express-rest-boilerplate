const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Billing = sequelize.define('Billing', {
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
    cardName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isCreditCard: true
      }
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [3, 4]
      }
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  })

  Billing.associate = models => {
    Billing.belongsTo(models.Account, { foreignKey: 'accountId' })
  }

  return Billing
}
