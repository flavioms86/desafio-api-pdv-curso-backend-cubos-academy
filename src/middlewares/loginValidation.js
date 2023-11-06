const joi = require("joi");
const jwt = require("jsonwebtoken");

const validateUserSchema = (req, res, next) => {

    const userSchema = joi.object({
        email: joi.string().email().required().messages({
            "string.base": "O campo email deve ser um texto",
            "string.email": "Email inválido",
            "string.empty": "Email não pode ser vazio",
            "any.required": "Email é obrigatório",
        }),
        senha: joi.string().min(6).required().messages({
            "string.empty": "Senha não pode ser vazia",
            "string.min": "A senha deve ter pelo menos 6 caracteres",
            "any.required": "Senha é obrigatória"
        }),
    });

    const { email, senha } = req.body;

    const { error } = userSchema.validate({ email, senha });

    if (error) {
        return res.status(422).json({
            error: error.message
        });
    }

    next();
}


const authenticateUser = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(401).json({
            "messagem": "Token não foi passado"
        });
    }
    const token = bearer.split(' ')[1];
    const user = jwt.getUser(token);
    if (!user) {
        return res.status(401).json({
            "messagem": "Usuário não autorizado"
        });
    }
    req.user = user;
    next();
}

module.exports = {
    validateUserSchema,
    authenticateUser
};
