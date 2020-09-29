/**
 * Some shared utils functionalities
 */

const auth = require('./auth')
const logger = require('./logger')
const queries = require('./queries')
const setRoutes = require('./setRoutes')

module.exports = {
  ...auth,
  logger,
  ...queries,
  setRoutes
}
