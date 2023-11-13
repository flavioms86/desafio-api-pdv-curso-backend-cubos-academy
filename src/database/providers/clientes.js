const Knex = require("../knex/index");

const verifyClientsProvider = async (id) => {
  const result = await Knex("clientes").where({ id }).first();

  if (result) {
    return result;
  } else {
    return 0;
  }
};

const verifyClientEmail = async (email) => {
  const result = await Knex("clientes").where({ email }).first();

  if (result) {
    return result;
  } else {
    return 0;
  }
}

const verifyClientCPF = async (cpf) => {
  const result = await Knex("clientes").where({ cpf }).first();

  if (result) {
    return result;
  } else {
    return 0;
  }
}

const createClientProvider = async (
  nome,
  email,
  cpf
) => {  

  const result = await Knex("clientes")
    .insert({ nome, email, cpf })
    .returning("*");

  return result[0];
};

const updateClientProvider = async (
  id,
  nome,
  email,
  cpf
) => {
  const result = await Knex("clientes")
    .update({ nome, email, cpf })
    .where({ id: id })
    .returning("*");

  return result[0];
};



module.exports = {
  verifyClientsProvider,
  createClientProvider,
  updateClientProvider,
  verifyClientEmail,
  verifyClientCPF
};
