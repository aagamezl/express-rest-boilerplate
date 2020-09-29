const router = require('express').Router()

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.json({ status: 'OK' }))

module.exports = router
