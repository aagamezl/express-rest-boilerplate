const controller = require('./billing.controller')
const validations = require('./billing.validation')

module.exports = [{
  path: '/billing/',
  method: 'post',
  handler: controller.create,
  validation: validations.create
}]
