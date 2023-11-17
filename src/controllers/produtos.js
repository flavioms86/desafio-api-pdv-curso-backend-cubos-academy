const provider = require("../database/providers");

const registerProducts = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const verifyCategory = await provider.verifyCategoryProvider(categoria_id);

    if (!verifyCategory) {
      return res.status(404).json({ mensagem: "O id da categoria informada não existe." });
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
    const verifyCategoria = await provider.verifyCategoryProvider(categoria_id);
    const verifyProduct = await provider.verifyProductsIdProvider(id);

    if (!verifyCategoria) {
      return res.status(400).json({ mensagem: "Não existe categoria para o id informado." });
    }
    if (!verifyProduct) {
      return res.status(400).json({ mensagem: "Não existe produto para o id informado." });
    }

    const product = await provider.updateProductProvider(
      id,
      descricao,
      quantidade_estoque,
      valor,
      categoria_id
    );
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

const deleteProducts = async (req, res) => {
  const id = req.params.id;

  try {
    const verifyProduct = await provider.verifyProductsIdProvider(id);

    if (!verifyProduct) {
      return res.status(404).json({ mensagem: "Não existe produto para o id informado." });
    }
    await provider.deleteProductProvider(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

const getProducts = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    if (categoria_id) {
      const products = await provider.getAllProductsAndCategory(categoria_id);
      return res.status(200).json(products);
    }

    const productWithoutFilter = await provider.getAllProducts();
    return res.status(200).json(productWithoutFilter);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

const getDetailProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const detailProduct = await provider.getProduct(id);

    if (detailProduct.length === 0) {
      return res.status(404).json({ mensagem: "Não existe produto para o id informado." });
    }
    return res.status(200).json(detailProduct[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

module.exports = {
  registerProducts,
  updateProducts,
  deleteProducts,
  getProducts,
  getDetailProduct,
};
