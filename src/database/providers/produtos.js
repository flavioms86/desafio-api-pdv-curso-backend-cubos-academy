const Knex = require("../knex/index");

const verifyProductsProvider = async (id) => {
    const result = await Knex("categorias").where({ id }).first();

    if (result) {
        return result;
    } else {
        return 0;
    }
};

const createProductProvider = async (descricao, quantidade_estoque, valor, categoria_id) => {
    const result = await Knex("produtos")
        .insert({ descricao, quantidade_estoque, valor, categoria_id })
        .returning("*");

    const productsRegistered = result[0];
    return productsRegistered;
};

module.exports = {
    verifyProductsProvider,
    createProductProvider
}