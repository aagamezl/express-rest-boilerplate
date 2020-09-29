const path = require('path')

const config = require('config')
const glob = require('glob')
const { Sequelize } = require('sequelize')

const DbConfig = config.database

const sequelize = DbConfig.use_env_variable
  ? new Sequelize(process.env[DbConfig.use_env_variable], DbConfig)
  : new Sequelize(DbConfig.uri)

const files = glob.sync('**/*.model.js', {
  cwd: __dirname
})

const models = files.map(file => {
  return require(path.join(__dirname, file))
})

// We define all models according to their files.
for (const modelDefiner of models) {
  modelDefiner(sequelize)
}

// Generate the associations
for (const [, model] of Object.entries(sequelize.models)) {
  if ('associate' in model) {
    model.associate(sequelize.models)
  }
}

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize
