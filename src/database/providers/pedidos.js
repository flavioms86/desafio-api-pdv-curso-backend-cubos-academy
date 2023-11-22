const { id } = require("../../utils/joi_schemas/loginUsuario");
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
        const existingOrder = acum.find(order => order.pedido.id === row.pedido_id);

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
                pedido_produtos: [{
                    id: row.pedido_produto_id,
                    quantidade_produto: row.quantidade_produto,
                    valor_produto: row.valor_produto,
                    pedido_id: row.pedido_produto_pedido_id,
                    produto_id: row.produto_id,
                }],
            });
        }

        return acum;
    }, []);

    return groupedResults;
};



const getOrderById = async (id_cliente) => {
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
        )
        .where("cliente_id", "=", id_cliente);

    const groupedResults = results.reduce((acum, row) => {
        const existingOrder = acum.find(order => order.pedido.id === row.pedido_id);

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
                pedido_produtos: [{
                    id: row.pedido_produto_id,
                    quantidade_produto: row.quantidade_produto,
                    valor_produto: row.valor_produto,
                    pedido_id: row.pedido_produto_pedido_id,
                    produto_id: row.produto_id,
                }],
            });
        }

        return acum;
    }, []);

    return groupedResults;
};

module.exports = {
    getAllOrder,
    getOrderById,
};
