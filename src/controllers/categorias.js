const getAllprovider = require("../database/providers/categorias");

const getAll = async (req, res) => {
  try {
    const result = await getAllprovider();
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro ao consultar os registros." });
  }
};

module.exports = getAll;
