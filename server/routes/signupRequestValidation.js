'use strict'

var Joi = require('joi')

module.exports = {
  options: { 
    allowUnknown: { 
      body: false 
    },
    contextRequest: true
  },
  body: {
    firstName: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    repeatedPassword: Joi.string().required()
  }
}