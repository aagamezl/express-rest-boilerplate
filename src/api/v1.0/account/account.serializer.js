const Config = require('config')

const VERSION = 'v1.0'
const baseUrl = `${Config.get('server.origin')}:${Config.get('server.port')}/${VERSION}`

const { Serializer } = require('jsonapi-serializer')

const serializer = {
  single: (data) => {
    const serializer = new Serializer('account', {
      attributes: ['name', 'type', 'logo', 'users', 'updatedAt', 'createdAt'],
      users: {
        ref: 'id',
        attributes: ['id', 'name', 'email'],
        includedLinks: {
          self: (dataSet, user) => `${baseUrl}/users/${user.id}`
        }
      },
      dataLinks: {
        self: (dataSet, account) => `${baseUrl}/accounts/${account.id}`
      },
      keyForAttribute: 'camelCase'
    })

    return serializer.serialize(data)
  },
  list: (rows, count, fields = ['name', 'type', 'logo', 'users', 'updatedAt', 'createdAt']) => {
    const serializer = new Serializer('accounts', {
      attributes: fields,
      users: {
        ref: 'id',
        attributes: ['id', 'name', 'email'],
        includedLinks: {
          self: (dataSet, user) => `${baseUrl}/users/${user.id}`
        }
      },
      meta: {
        count: rows.length,
        total: count
      },
      topLevelLinks: {
        self: `${Config.get('server.origin')}/v1.0/accounts`
      },
      keyForAttribute: 'camelCase'
    })

    return serializer.serialize(rows)
  }
}

module.exports = {
  serializer
}
