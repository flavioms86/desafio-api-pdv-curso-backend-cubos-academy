const joi = require("joi");

const productsRegister = joi.object({
  descricao: joi.string().empty().required().messages({
    "any.required": "O campo descricao é obrigatório",
    "string.empty": "O campo descricao não pode ser vazio",
  }),
  quantidade_estoque: joi
    .string()
    // .positive()
    // .integer()
    // .strict()
    .required()
    .messages({
      "any.required": "O campo quantidade_estoque é obrigatório",
      "string.base": "O campo quantidade_estoque precisa ser string",
    }),
  valor: joi
    .string()
    // .positive()
    // .integer()
    // .strict()
    .required()
    .messages({
      "any.required": "O campo valor é obrigatório",
      "string.base": "O campo valor precisa ser string",
    }),
  categoria_id: joi
    .string()
    .required()
    // .strict()
    .messages({
      "any.required": "O campo categoria_id é obrigatório",
      "string.base": "O campo categoria_id precisa ser string",
    }),
});

module.exports = productsRegister;
