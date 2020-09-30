const Joi = require('joi')

module.exports = {
  load: {
    // GET /v1.0/users
    params: Joi.object().keys({
      id: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  login: {
    // POST /v1.0/users/login
    payload: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(8)
        .max(64)
    }).unknown(false)
  },
  logout: {
    // POST /v1/auth/logout
    params: Joi.object().keys({
      id: Joi.string().guid({ version: 'uuidv4' }).required()
    })
  },
  register: {
    // POST /v1/auth/register
    payload: Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(8)
        .max(64)
    }).unknown(false)
  }
}
