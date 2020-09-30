const Config = require('config')

const VERSION = 'v1.0'
const baseUrl = `${Config.get('server.origin')}:${Config.get('server.port')}/${VERSION}`

const { Serializer } = require('jsonapi-serializer')

const serializer = {
  single: (data) => {
    const serializer = new Serializer('user', {
      attributes: ['name', 'email', 'updatedAt', 'createdAt'],
      topLevelLinks: {
        self: user => `${baseUrl}/users/${user.id}`
      },
      keyForAttribute: 'camelCase'
    })

    return serializer.serialize(data)
  },
  list: (rows, count) => {
    const serializer = new Serializer('user', {
      attributes: ['name', 'email', 'updatedAt', 'createdAt'],
      meta: {
        count: rows.length,
        total: count
      },
      topLevelLinks: {
        self: `${Config.get('server.origin')}/v1.0/users`
      },
      dataLinks: {
        self: (dataSet, vertical) => `${Config.get('server.origin')}/v1.0/users/${vertical.id}`
      },
      keyForAttribute: 'camelCase'
    })

    return serializer.serialize(rows)
  }
}

module.exports = {
  serializer
}
