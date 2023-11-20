const Knex = require("../knex/index");

const verifyProductStock = async( produto_id, quantidade_produto) => {
    const result = await Knex("produtos").where({id: produto_id}).first();

    if(result){
        return result
    } else if(!result || result.quantidade_estoque < quantidade_produto){
        return 0
    }
}

const createRequestProvider = async (cliente_id, observacao, pedido_produtos) => {
  const result = await Knex("produtos")
    .insert({
         cliente_id, 
         observacao,
         pedido_produtos})
    .returning("*");

  return result[0];
};


module.exports = {
    verifyProductStock,
    createRequestProvider
}
