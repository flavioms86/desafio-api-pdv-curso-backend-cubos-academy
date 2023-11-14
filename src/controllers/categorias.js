const providers = require("../database/providers");

const getAllcategory = async (req, res) => {
  try {
    const result = await providers.getAllprovider();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro ao consultar os registros." });
  }
};

module.exports = getAllcategory;
