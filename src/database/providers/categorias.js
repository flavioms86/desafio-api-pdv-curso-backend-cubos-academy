const Knex = require("../knex/index");

const getAllprovider = async () => {
  try {
    const result = await Knex("categorias");
    return result;
  } catch (error) {
    return new Error("Erro ao consultar os registros.");
  }
};

module.exports = getAllprovider;
