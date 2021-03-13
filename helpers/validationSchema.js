const Joi = require("joi");

const schemas = {
  loginModel: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  signUpModel: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().required(),
  }),
  planModel: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

module.exports = schemas;