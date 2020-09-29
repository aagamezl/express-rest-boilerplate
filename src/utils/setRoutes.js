const router = require('express').Router()

const validationMiddleware = require('./validation.middleware')

/**
 * A route for the API
 *
 * @typedef {Object} Route
 * @property {string} path - Indicates the route path
 * @property {string} method - Indicates the route method in lowercase.
 * @property {Function} handler - The route handler.
 * @property {object} [validation] - Indicates a optional vlaidation object.
 */

/**
 * Configure a set of routes
 *
 * @param {Array<Route>} routes
 * @returns {Router}
 */
const setRoutes = (routes) => {
  routes.forEach(({
    path, validation, method, handler, description
  }) => {
    if (validation) {
      router.route(path)[method](validationMiddleware(validation), handler)
    } else {
      router.route(path)[method](handler)
    }
  })

  return router
}

module.exports = setRoutes
