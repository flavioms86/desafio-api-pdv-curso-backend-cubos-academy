const Knex = require("../knex/index");

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

const deleteProductProvider = async (id) => {
  const result = await Knex("produtos").where({ id }).del();

  if (result) {
    return result;
  } else {
    return 0;
  }
};

const getAllProducts = async () => {
  const result = await Knex("produtos");
  return result;
};

const getAllProductsAndCategory = async (categoria_id) => {
  const result = await Knex("produtos").where({ categoria_id });
  return result;
};

module.exports = {
  createProductProvider,
  updateProductProvider,
  verifyProductsIdProvider,
  deleteProductProvider,
  getAllProducts,
  getAllProductsAndCategory,
};
