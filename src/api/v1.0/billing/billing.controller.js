const { StatusCodes } = require('http-status-codes')

const { Billing } = require('../db').models
const { serializer } = require('./billing.serializer')
const { buildQuery, buildSorting } = require('../../../utils')

const create = async (req, res) => {
  try {
    let billing = await Billing.findOne({
      where: {
        cardNumber: req.body.cardNumber,
        deletedAt: null
      }
    })

    if (billing) {
      throw new Error(`Billing card number ${req.body.cardNumber} already exists.`)
    }

    billing = await Billing.create(req.body)

    res.status(StatusCodes.CREATED).json(serializer.single(billing.toJSON()))
  } catch (error) {
    console.error(error)

    throw error
  }
}

const list = async (req, res) => {
  return res.json(req.body)
}

const load = async (req, res) => {
  return res.json(req.body)
}

const remove = async (req, res) => {
  return res.json(req.body)
}

const update = async (req, res) => {
  return res.json(req.body)
}

module.exports = {
  create,
  list,
  load,
  remove,
  update
}
