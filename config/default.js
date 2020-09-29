module.exports = {
  server: {
    origin: 'http://localhost',
    port: 3020
  },
  morgan: {
    logger: 'dev'
  },
  database: {
    dialect: 'postgres',
    port: 5433,
    host: 'localhost',
    operatorsAliases: false
  }
}
