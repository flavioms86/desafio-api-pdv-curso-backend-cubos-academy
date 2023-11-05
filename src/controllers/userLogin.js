const jwt_token_user = require("../utils/jwt/jwt_token_user");
const bcrypt = require("bcrypt");
const transporter = require("../utils/email_notifications/email_connection");
const {
  htmlCompiler,
} = require("../utils/email_notifications/compilation_html");
const { verifyUserProvider } = require("../database/providers/usuarios");

module.exports = {
  async userLogin(req, res) {
    const { email, senha } = req.body;

    try {
      const user = await verifyUserProvider(email);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Email e/ou senha inválido(s)." });
      }

      const correctPassword = await bcrypt.compare(senha, user.senha);

      if (!correctPassword) {
        return res
          .status(401)
          .json({ message: "Email e/ou senha inválido(s)." });
      }

      // const html = await htmlCompiler(
      //   "src/utils/email_notifications/login.html",
      //   {
      //     destinatario: user.nome,
      //   }
      // );

      // transporter.sendMail({
      //   from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      //   to: `${user.nome} <${user.email}>`,
      //   subject: "Tentativa de Login",
      //   html,
      // });

      const token = jwt_token_user.sign({ id: user.id });

      return res.status(200).json({
        usuario: {
          id: user.id,
          nome: user.nome,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  },
};
