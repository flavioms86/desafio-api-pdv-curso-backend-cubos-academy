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

const createProductProvider = async (descricao, quantidade_estoque, valor, categoria_id) => {
    const result = await Knex("produtos")
        .insert({ descricao, quantidade_estoque, valor, categoria_id })
        .returning("*");

    const productsRegistered = result[0];
    return productsRegistered;
};

const updateProductProvider = async (descricao, quantidade_estoque, valor, categoria_id) => {
    const { id } = req.params;
    const result = await Knex("produtos")
        .update({ descricao, quantidade_estoque, valor, categoria_id })
        .where({ id })
        .returning("*");

    const productsRegistered = result[0];
    return productsRegistered;
};

module.exports = {
    verifyProductsProvider,
    createProductProvider,
    updateProductProvider,
    verifyProductsUpdateProvider
}

