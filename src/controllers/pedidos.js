const provider = require("../database/providers");


const getOrder = async (req, res) => {
    try {
        const user = await provider.getAllOrder();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = {
    getOrder
}