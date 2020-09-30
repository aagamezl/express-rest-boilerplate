const Config = require('config')

const VERSION = 'v1.0'
const baseUrl = `${Config.get('server.origin')}:${Config.get('server.port')}/${VERSION}`

const { Serializer } = require('jsonapi-serializer')

const serializer = {
  single: (data) => {
    const serializer = new Serializer('billing', {
      attributes: ['accountId', 'cardName', 'cardNumber', 'cvv', 'expiration', 'updatedAt', 'createdAt'],
      topLevelLinks: {
        self: user => `${baseUrl}/billing/${user.id}`
      },
      keyForAttribute: 'camelCase'
    })

    return serializer.serialize(data)
  },
  list: (rows, count, fields = ['accountId', 'cardName', 'cardNumber', 'cvv', 'expiration', 'updatedAt', 'createdAt']) => {
    const serializer = new Serializer('billing', {
      attributes: fields,
      meta: {
        count: rows.length,
        total: count
      },
      topLevelLinks: {
        self: `${Config.get('server.origin')}/v1.0/billing`
      },
      dataLinks: {
        self: (dataSet, billing) => `${baseUrl}/billing/${billing.id}`
      },
      keyForAttribute: 'camelCase'
    })

    return serializer.serialize(rows)
  }
}

module.exports = {
  serializer
}
