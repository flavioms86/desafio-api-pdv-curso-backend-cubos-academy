const Knex = require("../knex/index");

const verifyProductForRequest = async (produto_id) => {
  const result = await Knex("produtos").where({ id: produto_id }).first();
  if (result) {
    return result;
  } else {
    return 0;
  }
};



// const createRequestProvider = async (
//   cliente_id,
//   observacao,
//   produto_id,
//   quantidade_produto,
//   valor_produto
// ) => {
  

//   const [result] = await Knex("pedidos").insert({
//     cliente_id,
//     observacao,
//     valor_total: quantidade_produto * valor_produto,
//   });

//   await Knex("pedido_produtos").insert({
//     pedido_id: result,
//     produto_id,
//     quantidade_produto,
//     valor_produto,
//   });
// };

const createRequestProvider = async (
  cliente_id,
  observacao,
  pedido_produtos
) => {

  const [pedido_id] = await Knex("pedidos").insert({
    cliente_id,
    observacao,
    valor_total: 0 
  });


  const totalValue = pedido_produtos.reduce((total, produto) => {
    return total + produto.quantidade_produto * produto.valor_produto;
  }, 0);

  await Knex("pedidos").where({ id: pedido_id }).update({ valor_total: totalValue });


  for (const produtoPedido of pedido_produtos) {
    const { produto_id, quantidade_produto, valor_produto } = produtoPedido;

    await Knex("pedido_produtos").insert({
      pedido_id,
      produto_id,
      quantidade_produto,
      valor_produto,
    });
  }
};






module.exports = {
  verifyProductForRequest,
  createRequestProvider,
 
  // createRequestProductProvider,
};
