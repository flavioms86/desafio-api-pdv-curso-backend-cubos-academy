const provider = require("../database/providers");

const getOrder = async (req, res) => {
    const { cliente_id } = req.query;

    try {
        if (cliente_id) {
            const order = await provider.getOrderById(cliente_id);

            if (!order || order.length === 0) {
                return res.status(404).json({ mensagem: "Não existem pedidos para o cliente_id informado." });
            }

            return res.status(200).json(order);
        }

        const allOrders = await provider.getAllOrder();

        return res.status(200).json(allOrders);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = {
    getOrder
};

