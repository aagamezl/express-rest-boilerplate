module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'),
      await queryInterface.createTable('Accounts', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        logo: {
          allowNull: false,
          type: Sequelize.STRING
        },
        type: {
          allowNull: false,
          type: Sequelize.ENUM('Business', 'Personal')
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
    return [
      await queryInterface.dropTable('Accounts'),
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Accounts_type";')
    ]
  }
}
