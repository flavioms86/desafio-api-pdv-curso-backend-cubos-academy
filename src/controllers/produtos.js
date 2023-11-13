const provider = require("../database/providers");

const registerProducts = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const verifyCategoria = await provider.verifyProductsProvider(categoria_id);

    if (!verifyCategoria) {
      return res
        .status(404)
        .json({ mensagem: "O id da categoria informada não existe." });
    }
    const product = await provider.createProductProvider(
      descricao,
      quantidade_estoque,
      valor,
      categoria_id
    );
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

module.exports = {
  registerProducts,
};
