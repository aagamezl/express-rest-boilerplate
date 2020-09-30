const controller = require('./account.controller')
const validations = require('./account.validation')

module.exports = [{
  path: '/accounts/',
  method: 'post',
  handler: controller.create,
  validation: validations.create
}, {
  path: '/accounts/',
  method: 'get',
  handler: controller.list
}, {
  path: '/accounts/:id',
  method: 'get',
  handler: controller.load,
  validation: validations.load
}, {
  path: '/accounts/:id',
  method: 'delete',
  handler: controller.remove,
  validation: validations.delete
}, {
  path: '/accounts/:id',
  method: 'patch',
  handler: controller.update,
  validation: validations.update
}]
