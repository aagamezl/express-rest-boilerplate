const { StatusCodes } = require('http-status-codes')

const { Account, User } = require('./../db').models
const { serializer } = require('./account.serializer')
const { buildQuery, buildSorting } = require('./../../../utils')

const create = async (req, res) => {
  const payload = req.body

  try {
    let account = await Account.findOne({
      where: {
        name: payload.name,
        deletedAt: null
      }
    })

    if (account) {
      throw new Error(`Account ${payload.name} already exists.`)
    }

    account = await Account.create(payload)

    res.status(StatusCodes.CREATED).json(serializer.single(account.toJSON()))
  } catch (error) {
    console.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    })
  }
}

const list = async (req, res) => {
  try {
    const { page: { size, number } = {}, filter = {}, sort = '' } = req.query

    const { rows = [], count = 0 } = await Account.findAndCountAll({
      where: {
        deletedAt: null,
        ...buildQuery(filter)
      },
      include: [
        { model: User, as: 'users' }
      ],
      order: buildSorting(sort),
      offset: number,
      limit: size
    })

    res.json(serializer.list(rows, count))
  } catch (error) {
    console.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const load = async (req, res) => {
  try {
    const account = await Account.findOne({
      where: {
        id: req.params.id,
        deletedAt: null
      },
      include: [
        { model: User, as: 'users' }
      ]
    })

    if (!account) {
      throw new Error(`Account ${req.params.id} doesn't exists.`)
    }

    res.status(StatusCodes.OK).json(serializer.single(account.toJSON()))
  } catch (error) {
    console.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    })
  }
}

const remove = async (req, res) => {
  try {
    const account = await Account.findOne({
      where: {
        id: req.params.id,
        deletedAt: null
      }
    })

    if (!account) {
      throw new Error(`Account ${req.params.id} doesn't exists.`)
    }

    if (req.query.hardDelete === 'true') {
      await account.destroy()
    } else {
      account.update({
        deletedAt: Date.now()
      })
    }

    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    console.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    })
  }
}

const update = async (req, res) => {
  try {
    let account = await Account.findOne({
      where: {
        id: req.params.id,
        deletedAt: null
      }
    })

    if (!account) {
      throw new Error(`Account ${req.params.id} doesn't exists.`)
    }

    account = await account.update(req.body)

    res.status(StatusCodes.OK).json(serializer.single(account.toJSON()))
  } catch (error) {
    console.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    })
  }
}

module.exports = {
  create,
  list,
  load,
  remove,
  update
}
