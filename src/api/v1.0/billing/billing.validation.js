const Joi = require('joi')

module.exports = {
  create: {
    // POST /v1/accounts
    payload: Joi.object({
      accountId: Joi.string()
        .required(),
      cardName: Joi.string()
        .required(),
      cardNumber: Joi.string()
        .required(),
      cvv: Joi.string()
        .required(),
      expiration: Joi.string()
        .required()
    }).unknown(false)
  }
}
