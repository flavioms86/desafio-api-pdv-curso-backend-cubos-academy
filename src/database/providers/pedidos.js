const Knex = require("../knex/index");

const verifyProductForRequest = async (produto_id) => {
  const result = await Knex("produtos").where({ id: produto_id }).first();
  if (result) {
    return result;
  } else {
    return 0;
  }
};

const createRequestProvider = async (
  cliente_id,
  observacao,
  produto_id = 34,
  quantidade_produto = 5,
  valor_produto = 40000
) => {
  const [result] = await Knex("pedidos").insert({
    cliente_id,
    observacao,
    valor_total: quantidade_produto * valor_produto,
  });
  
  await Knex("pedido_produtos").insert({
    pedido_id: result,
    produto_id,
    quantidade_produto,
    valor_produto,
  });
};



module.exports = {
  verifyProductForRequest,
  createRequestProvider,
 
  // createRequestProductProvider,
};
