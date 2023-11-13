const Knex = require("../knex/index");

const verifyProductsProvider = async (id) => {
  const result = await Knex("categorias").where({ id }).first();

  if (result) {
    return result;
  } else {
    return 0;
  }
};

const verifyProductsIdProvider = async (id) => {
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

  const productsRegistered = result[0];
  return productsRegistered;
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

  const productsRegistered = result[0];
  return productsRegistered;
};

const deleteProductProvider = async (id) => {
  const result = await Knex("produtos").where({ id }).del();

  if (result) {
    return result;
  } else {
    return 0;
  }
};

module.exports = {
  verifyProductsProvider,
  createProductProvider,
  updateProductProvider,
  verifyProductsIdProvider,
  deleteProductProvider,
};
