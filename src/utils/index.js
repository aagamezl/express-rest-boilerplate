/**
 * Some shared utils functionalities
 */

const auth = require('./auth')
const getRoutesMap = require('./getRoutesMap')
const logger = require('./logger')
const queries = require('./queries')
const setRoutes = require('./setRoutes')

module.exports = {
  ...auth,
  getRoutesMap,
  logger,
  ...queries,
  setRoutes
}
