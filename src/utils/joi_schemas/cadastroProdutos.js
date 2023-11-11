const joi = require("joi");

const productsRegister = joi.object({
    descricao: joi.string().empty().required().messages({
        "any.required": "O campo descrição é obrigatório",
        "string.empty": "O campo descrição não pode ser vazio",
    }),
    quantidade_estoque: joi.number().required().messages({
        "any.required": "O campo quantidade_estoque é obrigatório",
        "number.base": "O campo quantidade_estoque precisa ser um número",
    }),
    valor: joi.number().required().messages({
        "any.required": "O campo valor é obrigatório",
        "number.base": "O campo valor precisa ser um número",
    }),
    categoria_id: joi.number().required().messages({
        "any.required": "O campo categoria_id é obrigatório",
        "number.base": "O campo categoria_id precisa ser um número",
    }),
});

module.exports = productsRegister;
