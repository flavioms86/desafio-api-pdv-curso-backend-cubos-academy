const provider = require("../database/providers");

const registerProducts = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const verifyCategory = await provider.verifyProductsProvider(categoria_id);

    if (!verifyCategory) {
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

const updateProducts = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const id = req.params.id;

  try {
    const verifyCategory = await provider.verifyProductsProvider(categoria_id);
    const verifyProduct = await provider.verifyProductsUpdateProvider(id);

    if (!verifyCategory) {
      return res
        .status(404)
        .json({ mensagem: "O id da categoria informada não existe." });
    }
    if (!verifyProduct) {
      return res
        .status(404)
        .json({ mensagem: "O id do produto informado não existe." });
    }

    const product = await provider.updateProductProvider(
      id,
      descricao,
      quantidade_estoque,
      valor,
      categoria_id
    );
    return res.status(204).json(product);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

module.exports = {
  registerProducts,
  updateProducts,
};
