const controller = require('./account.controller')
const model = require('./account.model')
const validation = require('./account.validation')
const routes = require('./account.routes')

module.exports = {
  controller,
  model,
  routes,
  validation
}
