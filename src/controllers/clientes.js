const provider = require("../database/providers");

const registerClient = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

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

const updateClient = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
  const { id } = req.params;

  try {
    const verifyClient = await provider.verifyClientsProvider(id);
    
    if (!verifyClient) {
      return res
        .status(404)
        .json({ mensagem: "O cliente informado não existe." });
    }

    const verifyEmail = await provider.verifyClientEmail(email);
   
    if (verifyEmail && verifyEmail.email !== verifyClient.email) {
      return res.status(404).json({ mensagem: "O email informado já existe." });
    }

    const verifyCPF = await provider.verifyClientCPF(cpf);
    
    if (verifyCPF && verifyCPF.cpf !== verifyClient.cpf) {
      return res.status(404).json({ mensagem: "O CPF informado já existe." });
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
    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

module.exports = {
  registerClient,
  updateClient,
};
