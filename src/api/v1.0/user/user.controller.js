const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const { User } = require('./../db').models
const { serializer } = require('./user.serializer')

const { buildQuery, buildSorting, getHash } = require('./../../../utils')

const create = async (req, res) => {
  const payload = req.body

  try {
    let user = await User.findOne({
      where: {
        email: payload.email,
        deletedAt: null
      }
    })

    if (user) {
      throw new Error(`User ${payload.email} already exists.`)
    }

    payload.password = getHash(payload.password)

    user = await User.create(payload)

    res.status(StatusCodes.CREATED).json(serializer.single(user.toJSON()))
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    })
  }
}

const load = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
        deletedAt: null
      }
    })

    if (!user) {
      throw new Error(`User ${req.params.id} doesn't exists.`)
    }

    res.json(serializer.single(user.toJSON()))
  } catch (error) {
    console.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: [{
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        title: ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: error.message
      }]
    })
  }
}

const list = async (req, res) => {
  try {
    const { page: { size, number } = {}, filter = {}, sort = '' } = req.query

    // users/?page[number]=2&page[size]=10&sort=name&filter[name]=Jane

    const { rows = [], count = 0 } = await User.findAndCountAll({
      where: {
        deletedAt: null,
        ...buildQuery(filter)
      },
      order: buildSorting(sort),
      offset: number,
      limit: size
    })

    res.json(serializer.list(rows, count))
  } catch (error) {
    console.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: [{
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        title: ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: error.message
      }]
    })
  }
}

const login = async (req, res) => {
  return res.json(req.body)
}

const logout = async (req, res) => {
  return res.json({ status: 'ok' })
}

module.exports = {
  create,
  list,
  load,
  login,
  logout
}
