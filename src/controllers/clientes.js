const provider = require("../database/providers");

const registerClient = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  try {
    const verifyEmail = await provider.verifyClientEmail(email);

    if (verifyEmail) {
      return res.status(400).json({ mensagem: "O email informado já existe." });
    }

    const verifyCPF = await provider.verifyClientCPF(cpf);

    if (verifyCPF) {
      return res.status(400).json({ mensagem: "O CPF informado já existe." });
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

const updateClient = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
  const { id } = req.params;

  try {
    const verifyClient = await provider.verifyClientsProvider(id);

    if (!verifyClient) {
      return res.status(404).json({ mensagem: "O cliente informado não existe." });
    }

    const verifyEmail = await provider.verifyClientEmail(email);

    if (verifyEmail && verifyEmail.email !== verifyClient.email) {
      return res.status(400).json({ mensagem: "O email informado já existe." });
    }

    const verifyCPF = await provider.verifyClientCPF(cpf);

    if (verifyCPF && verifyCPF.cpf !== verifyClient.cpf) {
      return res.status(400).json({ mensagem: "O CPF informado já existe." });
    }
    const client = await provider.updateClientProvider(
      id,
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
    return res.status(204).json(client);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

const getClients = async (req, res) => {
  const id = req.query;
  try {
    const user = await provider.getAllClients(id);

    if (!id) {
      return res
      .status(401)
      .json({ mensagem: "O id informado não existe." });
    }
      return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor."});
  }
};

module.exports = {
  registerClient,
  updateClient,
  getClients,
};
