const provider = require("../database/providers");
const { htmlCompiler } = require("../utils/email_notifications/compilation_html");
const transporter = require("../utils/email_notifications/email_connection");

const registerOrder = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    const clientExists = await provider.verifyClientsProvider(cliente_id);

    if (!clientExists) {
        return res
            .status(404)
            .json({ mensagem: "Não existe cliente para o id informado." });
    }

    console.log(pedido_produtos);

    if (pedido_produtos.length === 0) {
        return res.status(400).json({
            mensagem: "Deve ser informado a lista de produtos a ser feito o pedido",
        });
    }
    const produtosPedido = [];
    for (const pedProduto of pedido_produtos) {
        const result = await provider.verifyProductsIdProvider(
            pedProduto.produto_id
        );

        if (!result) {
            return res.status(400).json({
                mensagem: `Não existe o produto com o id ${pedProduto.produto_id}.`,
            });
        }

        if (result.quantidade_estoque < pedProduto.quantidade_produto) {
            return res.status(400).json({
                mensagem: `Quantidade insuficiente no estoque para o produto "${result.descricao}"`,
            });
        }

        produtosPedido.push({
            id: result.id,
            quantidade_estoque: result.quantidade_estoque,
            valor: result.valor,
            quantidade: pedProduto.quantidade_produto,
        });
    }

    const registrarPedido = await provider.createOrder(cliente_id, observacao);

    await provider.createOrderProducts(registrarPedido[0].id, produtosPedido);

    return res.status(201).json("tudo certo.. eu acho");
};
module.exports = registerOrder;
