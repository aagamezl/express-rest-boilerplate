const {
  create,
  list,
  load,
  login,
  logout
} = require('./user.controller')
const validations = require('./user.validation')

module.exports = [{
  path: '/users/',
  method: 'get',
  handler: list
}, {
  path: '/users/:id',
  method: 'get',
  handler: load,
  validation: validations.load
}, {
  path: '/users/login',
  method: 'post',
  handler: login,
  validation: validations.login
}, {
  path: '/users/logout/:id',
  method: 'post',
  handler: logout,
  validation: validations.logout
}, {
  path: '/users/register',
  method: 'post',
  handler: create,
  validation: validations.register
}]
