const Knex = require("../knex/index");

const verifyProductsProvider = async (id) => {
  const result = await Knex("categorias").where({ id }).first();

  if (result) {
    return result;
  } else {
    return 0;
  }
};

const verifyProductsUpdateProvider = async (id) => {
  const result = await Knex("produtos").where({ id }).first();

  if (result) {
    return result;
  } else {
    return 0;
  }
};

const createProductProvider = async (
  descricao,
  quantidade_estoque,
  valor,
  categoria_id
) => {
  const result = await Knex("produtos")
    .insert({ descricao, quantidade_estoque, valor, categoria_id })
    .returning("*");

  return result[0];
};

const updateProductProvider = async (
  id,
  descricao,
  quantidade_estoque,
  valor,
  categoria_id
) => {
  const result = await Knex("produtos")
    .update({ descricao, quantidade_estoque, valor, categoria_id })
    .where({ id: id })
    .returning("*");

  return result[0];
};

module.exports = {
  verifyProductsProvider,
  createProductProvider,
  updateProductProvider,
  verifyProductsUpdateProvider,
};
