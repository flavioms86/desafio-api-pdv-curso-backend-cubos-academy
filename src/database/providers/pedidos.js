const Knex = require("../knex/index");

const verifyProductForRequest = async (produto_id) => {
    const result = await Knex("produtos").where({ id: produto_id }).first();
    if (result) {
        return result;
    } else {
        return 0;
    }
};

const createOrder = async (cliente_id, observacao) => {
    const pedido = await Knex("pedidos")
        .insert({ cliente_id, observacao, valor_total: 0 })
        .returning("*");
    return pedido;
};

const createOrderProducts = async (pedido_id, produtos) => {
    let valorTotal = 0;
    for (const produto of produtos) {
        await Knex("pedido_produtos").insert({
            pedido_id,
            produto_id: produto.id,
            quantidade_produto: produto.quantidade,
            valor_produto: produto.valor,
        });
        valorTotal += produto.valor;
        await updateProductStockAfterOrder(produto.id, produto.quantidade);
    }

    await updateTotalOrderPrice(pedido_id, valorTotal);
    return;
};

const updateProductStockAfterOrder = async (produto_id, quantidade_estoque) => {
    await Knex("produtos")
        .decrement({ quantidade_estoque })
        .where({ id: produto_id });
    return;
};

const updateTotalOrderPrice = async (pedido_id, valorTotal) => {
    await Knex("pedidos")
        .update({ valor_total: valorTotal })
        .where({ id: pedido_id });
    return;
};

module.exports = {
    verifyProductForRequest,
    createOrderProducts,
    createOrder,
};
