/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const resultado = knex("categorias").count();
  if (!Number.isInteger(resultado) || Number(count) > 0) return;

  const categoriasToInsert = categorias.map((categoria) => ({
    descricao: categoria,
  }));
  await knex("categorias").insert(categoriasToInsert);
};

const categorias = [
  "Informática",
  "Celulares",
  "Beleza e Perfumaria",
  "Mercado",
  "Livros e Papelaria",
  "Brinquedos",
  "Moda",
  "Bebê",
  "Games",
];
