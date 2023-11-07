const jwt_token_user = require("../utils/jwt/jwt_token_user");
const bcrypt = require("bcrypt");
const transporter = require("../utils/email_notifications/email_connection");
const { 
  createUserProvider, 
  updateUserProvider,
  verifyUserProvider,
  getUserById,
} = require("../database/providers/usuarios");
const { htmlCompiler } = require("../utils/email_notifications/compilation_html");

const userLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await verifyUserProvider(email);

    if (!user) {
      return res.status(401).json({ message: "Email e/ou senha inválido(s)." });
    }

    const correctPassword = await bcrypt.compare(senha, user.senha);

    if (!correctPassword) {
      return res.status(401).json({ message: "Email e/ou senha inválido(s)." });
    }

    const html = await htmlCompiler(
      "src/utils/email_notifications/login.html",
      {
        destinatario: user.nome,
      }
    );

    transporter.sendMail({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      to: `${user.nome} <${user.email}>`,
      subject: "Tentativa de Login",
      html,
    });

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
};

const userDetails = async (req, res) => {
  try {
    const user = await getUserById(req.userId);
    return res.status(200).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ mensgem: "Erro interno" });
  }
}

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const userFound = await verifyUserProvider(email);

    if (userFound) {
      return res.status(404).json({ mensagem: "O email já existe" });
    }

    const encryptedPass = await bcrypt.hash(senha, 10);

    const user = await createUserProvider(nome, email, encryptedPass);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor!!" });
  }
};

const updateUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.user;

  try {
    const userFound = await verifyUserProvider(email);

    if (!userFound) {
      return res.status(404).json({ mensagem: "Usuario não encontrado" });
    }

    const encryptedPass = await bcrypt.hash(senha, 10);

    if (email !== req.user.email) {
      const existingUserEmail = await verifyUserProvider(email);

      if (existingUserEmail) {
        return res.status(400).json({ mensagem: "O Email já existe." });
      }
    }

    await updateUserProvider(id, nome, email, encryptedPass);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  userLogin,
  userDetails,
  registerUser,
  updateUser,
};
