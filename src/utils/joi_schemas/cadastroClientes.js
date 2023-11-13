const joi = require("joi");

const clientRegister = joi.object({
  nome: joi
    .string()
    .required()
    .min(3)
    .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
    .messages({
      "any.required": "O campo nome é obrigatório",
      "string.base": "O campo nome deve ser do tipo string",
      "string.empty": "O campo nome é obrigatório",
      "string.min": "O campo nome deve ter um tamanho mínimo de 3 caracteres.",
      "string.pattern.base": "O campo nome deve conter apenas letras com ou sem acentuação.",
    }),
  email: joi.string().email().required().messages({
    "string.email": "O campo email precisa ser em um formato valido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),
  cpf: joi.string().min(5).required().messages({
    "any.required": "O campo cpf é obrigatório",
    "string.empty": "O campo cpf é obrigatório",
    "string.base": "O campo cpf deve ser do tipo string"
  }),
});

module.exports = clientRegister;
