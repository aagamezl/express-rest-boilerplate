module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'),
      await queryInterface.createTable('Billings', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4
        },
        accountId: {
          allowNull: false,
          type: Sequelize.UUID
        },
        cardName: {
          allowNull: false,
          type: Sequelize.STRING
        },
        cardNumber: {
          allowNull: false,
          type: Sequelize.STRING
        },
        cvv: {
          allowNull: false,
          type: Sequelize.STRING
        },
        expiration: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        }
      })
    ]
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Billings')
  }
}
