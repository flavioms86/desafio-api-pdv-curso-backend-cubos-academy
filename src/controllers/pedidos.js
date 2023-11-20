const provider = require("../database/providers");


const getOrder = async (req, res) => {
    try {
        const user = await provider.getAllOrder();
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

const getOrderId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await provider.getOrderById(id);
        if (user.length === 0) {
            return res
                .status(404)
                .json({ mensagem: "Não existe pedido(s) para o cliente_id informado." });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = {
    getOrder,
    getOrderId
};
