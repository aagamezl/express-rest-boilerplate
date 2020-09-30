const controller = require('./user.controller')
const validations = require('./user.validation')
const routes = require('./user.routes')

module.exports = {
  controller,
  routes,
  validations
}
