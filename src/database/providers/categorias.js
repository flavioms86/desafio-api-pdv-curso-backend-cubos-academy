const Knex = require("../knex/index");

const getAllprovider = async () => {
  const result = await Knex("categorias");
  return result;
};

module.exports = getAllprovider;
