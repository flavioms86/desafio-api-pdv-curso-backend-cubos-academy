const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require();
const { Pool } = require("pg");

module.exports = {
  async userLogin(req, res) {
    const { email, senha } = req.body;


    try {
      const user = await knex("usuarios").where({ email }).first();

      if (!user) {
        return res
          .status(404)
          .json({ message: "Email e/ou senha inválido(s)." });
      }

      const userPassword = user.senha;
      const correctPassword = await bcrypt.compare(senha, userPassword);

      if (!correctPassword) {
        return res
          .status(401)
          .json({ message: "Email e/ou senha inválido(s)." });
      }

      const { senha: _, ...loggedUser } = user;

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || env.jwt.secret,
        options.process.env.JWT_EXPIRES_IN || env.jwt.expires
      );

      return res.json({ usuario: loggedUser, token });
    } catch (error) {
      return res.status(500).json({ mensagem: "Error interno do servidor" });
    }
  },
};