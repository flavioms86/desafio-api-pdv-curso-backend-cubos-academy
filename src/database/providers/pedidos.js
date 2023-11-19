const Knex = require("../knex/index");

const getAllOrder = async () => {
    const result = await Knex("pedidos")
        .join("pedido_produtos", "pedidos.id", "=", "pedido_produtos.pedido_id")


    return result;
};

module.exports = {
    getAllOrder
}