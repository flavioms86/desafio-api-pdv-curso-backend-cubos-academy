const bcrypt = require("bcrypt");
const { createUserProvider, updateUserProvider } = require("../database/providers/usuarios");
const Knex = require("../database/knex/index");

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const userFound = await Knex("usuarios").where({ email }).first();

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

const updateProfileUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.user;

  try {
    const userFound = await Knex("usuarios").where({ email }).first();

    if (!userFound) {
      return res.status(404).json({ mensagem: "Usuario não encontrado" });
    }

    const encryptedPass = await bcrypt.hash(senha, 10);

    if (email !== req.user.email) {
      const existingUserEmail = await Knex("usuarios").where({ email }).first();

      if (existingUserEmail) {
        return res.status(400).json({ mensagem: "O Email já existe." });
      }
    }

    await updateUserProvider(idUsuario, nome, email, encryptedPass);

    return res.status(204).send();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor.." });
  }
};

module.exports = {
  registerUser,
  updateProfileUser,
};
