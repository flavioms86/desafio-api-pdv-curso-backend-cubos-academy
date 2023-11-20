const provider = require("../database/providers");

const registerRequest = async (req, res) => {
  try {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    if (!cliente_id || !pedido_produtos || pedido_produtos.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Campos obrigatórios não informados." });
    }

    const clientExists = await provider.verifyClientsProvider(cliente_id);

    if (!clientExists) {
      return res.status(404).json({ mensagme: "Cliente não encontrado." });
    }

    //for of para verificar cada produto/estoque
    for (const produtoPedido of pedido_produtos) {
      const { produto_id, quantidade_produto } = produtoPedido;
      const productExists = await provider.verifyProductStock(produto_id, quantidade_produto);

      if (!productExists) {
        return res
          .status(404)
          .json({
            mensagem:
              "Produto não encontrado ou quantidade insuficiente em estoque.",
          });
      }

      pedido_produtos.push(produtoPedido);
    }

    const requestCreated = await provider.createRequestProvider(
      cliente_id,
      observacao,
      pedido_produtos
    );

    return res.status(201).json({mensagem: "Pedido cadastrado com sucesso!", pedido: requestCreated})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ mensagme: "Erro interno no servidor." });
  }
};

module.exports = registerRequest;
