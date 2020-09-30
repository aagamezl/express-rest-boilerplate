const router = require('express').Router()

const { setRoutes } = require('../../utils')

const { routes: accountRoutes } = require('./account')
const { routes: billingRoutes } = require('./billing')
const { routes: userRoutes } = require('./user')

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.json({ status: 'OK' }))

router.use('/', setRoutes(accountRoutes))
router.use('/', setRoutes(billingRoutes))
router.use('/', setRoutes(userRoutes))

module.exports = router
