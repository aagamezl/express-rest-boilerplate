const crypto = require('crypto')

/**
 * Create a SHA512 hash
 *
 * @param {string} value
 * @returns {string}
 */
const getHash = (value) => {
  return crypto.createHash('sha512').update(value, 'utf-8').digest('hex')
}

module.exports = {
  getHash
}
