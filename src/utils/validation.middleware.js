const { ReasonPhrases, StatusCodes } = require('http-status-codes')

const validateOptions = {
  abortEarly: false // include all errors
}

const formatError = (error, source) => {
  const { details } = error
  const message = details.map(item => item.message).join('. ')
  const keys = details.map(item => item.context.key)

  return {
    errors: [{
      status: StatusCodes.BAD_REQUEST,
      title: ReasonPhrases.BAD_REQUEST,
      details: message,
      validation: {
        source,
        keys
      }
    }]
  }
}

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    if (schema.params) {
      const { error } = schema.params.validate(req.params, validateOptions)

      if (!error) {
        next()
      } else {
        res.status(StatusCodes.BAD_REQUEST).json(formatError(error, 'params'))
      }

      return
    }

    const { error } = schema.payload ? schema.payload.validate(req.body, validateOptions) : null

    if (!error) {
      next()
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(formatError(error, 'payload'))
    }
  }
}

module.exports = validationMiddleware
