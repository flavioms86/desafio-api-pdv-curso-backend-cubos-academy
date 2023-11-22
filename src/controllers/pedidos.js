const provider = require("../database/providers");
const { htmlCompiler } = require("../utils/email_notifications/compilation_html");
const transporter = require("../utils/email_notifications/email_connection");

// const registerRequest = async (req, res) => {
//     try {
//         const { cliente_id, observacao, pedido_produtos } = req.body;

//         if (!cliente_id || !pedido_produtos || pedido_produtos.length === 0) {
//             return res
//                 .status(400)
//                 .json({ mensagem: "Campos obrigatórios não informados." });
//         }

//         const clientExists = await provider.verifyClientsProvider(cliente_id);

//         if (!clientExists) {
//             return res.status(404).json({ mensagem: "Cliente não encontrado." });
//         }

//         //for of para verificar estoque
//         for (const produtoPedido of pedido_produtos) {
//             const { produto_id, quantidade_produto } = produtoPedido;
//             const productExists = await provider.verifyProductForRequest(produto_id);

//             if (!productExists) {
//                 return res.status(404).json({
//                     mensagem: "Produto não encontrado.",
//                 });
//             }

//             if (
//                 productExists &&
//                 productExists.quantidade_estoque < quantidade_produto
//             ) {
//                 return res.status(404).json({
//                     mensagem: `Quantidade insuficiente em estoque para ${productExists.descricao}`,
//                 });
//             }
//             await provider.createRequestProvider(
//                 cliente_id,
//                 observacao,
//                 pedido_produtos
//             );
//         }

//         const html = await htmlCompiler(
//             "src/utils/email_notifications/pedido.html",
//             {
//                 destinatario: clientExists.nome,
//             }
//         );

//         transporter.sendMail({
//             from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
//             to: `${clientExists.nome} <${clientExists.email}>`,
//             subject: "Pedido efetuado com sucesso!",
//             html,
//         });

//         return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso!" });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({ mensagem: "Erro interno no servidor." });
//     }
// };

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
    // return res.status(201).json(produtosID);
};
module.exports = registerOrder;
