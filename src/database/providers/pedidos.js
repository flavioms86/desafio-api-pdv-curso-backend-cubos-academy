const Knex = require("../knex/index");

const getAllOrder = async () => {
    const results = await Knex("pedidos")
        .leftJoin("pedido_produtos", "pedidos.id", "=", "pedido_produtos.pedido_id")
        .groupBy("pedidos.id", "pedido_produtos.id")
        .select(
            "pedidos.id as pedido_id",
            "pedidos.valor_total",
            "pedidos.observacao",
            "pedidos.cliente_id",
            "pedido_produtos.id as pedido_produto_id",
            "pedido_produtos.quantidade_produto",
            "pedido_produtos.valor_produto",
            "pedido_produtos.pedido_id as pedido_produto_pedido_id",
            "pedido_produtos.produto_id"
        );

    const groupedResults = results.reduce((acum, row) => {
        const existingOrder = acum.find(
            (order) => order.pedido.id === row.pedido_id
        );

        if (existingOrder) {
            existingOrder.pedido_produtos.push({
                id: row.pedido_produto_id,
                quantidade_produto: row.quantidade_produto,
                valor_produto: row.valor_produto,
                pedido_id: row.pedido_produto_pedido_id,
                produto_id: row.produto_id,
            });
        } else {
            acum.push({
                pedido: {
                    id: row.pedido_id,
                    valor_total: row.valor_total,
                    observacao: row.observacao,
                    cliente_id: row.cliente_id,
                },
                pedido_produtos: [
                    {
                        id: row.pedido_produto_id,
                        quantidade_produto: row.quantidade_produto,
                        valor_produto: row.valor_produto,
                        pedido_id: row.pedido_produto_pedido_id,
                        produto_id: row.produto_id,
                    },
                ],
            });
        }

        return acum;
    }, []);

    return groupedResults;
};

const getOrderById = async (id_cliente) => {
    const resultOrder = await Knex("pedidos")
        .select("id", "valor_total", "observacao", "cliente_id")
        .where("cliente_id", "=", id_cliente);

    const resultOrderProducts = await Knex("pedido_produtos").select(
        "id",
        "quantidade_produto",
        "valor_produto",
        "pedido_id",
        "produto_id"
    );

    const formatarDados = resultOrder.map((order) => {
        const result = resultOrderProducts.filter(
            (orderProduct) => orderProduct.pedido_id == order.id
        );
        return {
            pedido: {
                id: order.id,
                valor_total: order.valor_total,
                observacao: order.observacao,
                cliente_id: order.cliente_id,
            },
            pedido_produtos: result,
        };
    });

    return formatarDados;
};

const getOrderProducts = async (produto_id) => {
    const resultOrder = await Knex("pedido_produtos")
        .select("produto_id")
        .where("produto_id", produto_id);

    return resultOrder;
};

const verifyProductForOrder = async (produto_id) => {
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
        const verifyProductInOrder = await Knex("pedido_produtos")
            .where("produto_id", "=", produto.id)
            .andWhere("pedido_id", "=", pedido_id);

        if (verifyProductInOrder.length === 0) {
            await Knex("pedido_produtos").insert({
                pedido_id,
                produto_id: produto.id,
                quantidade_produto: produto.quantidade,
                valor_produto: produto.valor,
            });
            valorTotal += produto.valor;
            await updateProductStockAfterOrder(produto.id, produto.quantidade);
        } else {
            await Knex("pedido_produtos").increment({
                quantidade_produto: produto.quantidade,
                valor_produto: produto.valor,
            });
            valorTotal += produto.valor;
            await updateProductStockAfterOrder(produto.id, produto.quantidade);
        }
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
    getAllOrder,
    getOrderById,
    getOrderProducts,
    verifyProductForOrder,
    createOrder,
    createOrderProducts,
};
