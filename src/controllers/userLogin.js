const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const transporter = require("../utils/email");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
})

module.exports = {
  async userLogin(req, res) {
    const { email, senha } = req.body;

    try {
      const user = await knex("usuarios").where({ email }).first();

      if (!user) {
        return res
          .status(401)
          .json({ message: "Email e/ou senha inválido(s)." });
      }

      const userPassword = user.senha;
      const correctPassword = await bcrypt.compare(senha, userPassword);

      if (!correctPassword) {
        return res
          .status(401)
          .json({ message: "Email e/ou senha inválido(s)." });
      }

      const html = fs.readFileSync("src/utils/login.html", "utf8");

      const emailContent = html.replace('{{nomeusuario}}', user.nome);

      transporter.sendMail({
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
        to: `${user.nome} <${user.email}>`,
        subject: 'Tentativa de Login',
        html: emailContent,
      });

      const { senha: _, ...loggedUser } = user;

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.json({ usuario: loggedUser, token });

    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },
};
