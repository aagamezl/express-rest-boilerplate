const Joi = require('joi')

module.exports = {
  load: {
    // GET /v1.0/users
    params: Joi.object().keys({
      id: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  delete: {
    // GET /v1.0/users
    params: Joi.object().keys({
      id: Joi.string().guid({ version: 'uuidv4' }).required()
    }),
    query: Joi.object().keys({
      hardDelete: Joi.boolean()
    })
  },
  create: {
    // POST /v1/accounts
    payload: Joi.object({
      name: Joi.string()
        .required(),
      logo: Joi.string()
        .required(),
      type: Joi.string()
        .valid('Business', 'Personal')
        .default('Personal')
    }).unknown(false)
  },
  update: {
    // PATCH /v1/accounts
    params: Joi.object().keys({
      id: Joi.string().guid({ version: 'uuidv4' }).required()
    }),
    payload: Joi.object({
      name: Joi.string()
        .required(),
      logo: Joi.string()
        .required(),
      type: Joi.string()
        .valid('Business', 'Personal')
        .default('Personal')
    }).unknown(false)
  }
}
