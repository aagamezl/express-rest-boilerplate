const { Op } = require('sequelize')

const buildAttributes = (fields) => {
  return Object.entries(fields).reduce((query, [model, fields]) => {
    query[model] = fields.split(',')

    return query
  }, {})
}

const buildQuery = (filter = {}) => {
  return Object.entries(filter).reduce((query, [field, value]) => {
    query[field] = {
      [Op.like]: `%${value}%`
    }

    return query
  }, {})
}

const buildSorting = (sort) => {
  return sort.length > 0
    ? sort.split(',').map(field => [field, field.startsWith('-') ? 'DESC' : 'ASC'])
    : undefined
}

module.exports = {
  buildAttributes,
  buildQuery,
  buildSorting
}
