const provider = require("../database/providers");

const registerClient = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  try {
    const verifyEmail = await provider.verifyClientEmail(email);

    if (verifyEmail) {
      return res.status(404).json({ mensagem: "O email informado já existe." });
    }

    const verifyCPF = await provider.verifyClientCPF(cpf);

    if (verifyCPF) {
      return res.status(404).json({ mensagem: "O CPF informado já existe." });
    }

    const client = await provider.createClientProvider(
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado
    );
    return res.status(201).json(client);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

module.exports = {
  registerClient,
};
