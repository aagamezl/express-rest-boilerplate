const controller = require('./billing.controller')
const model = require('./billing.model')
const validation = require('./billing.validation')
const routes = require('./billing.routes')

module.exports = {
  controller,
  model,
  routes,
  validation
}
