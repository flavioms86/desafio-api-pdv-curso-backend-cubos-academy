const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {

    if(!nome || !email || !senha){
      return res.status(404).json({mensagem: 'todos os campos são obrigatórios!'})
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await knex('usuarios').insert({
      nome,
      email,
      senha: senhaCriptografada
    }).returning('*');

    return res.status(201).json(novoUsuario)
    
  } catch (error) {
    return res.status(500).json({mensagem: 'erro interno no servidor!'})
  }
}

module.exports = {
  registerUser
}
