const bcrypt = require('bcrypt');
const UsuarioModel = require('../model/usuario');

const UsuarioController = {
  cadastrarUsuario: function (requisicao, resposta) {
    const novoUsuario = requisicao.body.usuario;
  
    bcrypt.hash(novoUsuario.senha, 10, async function(erro, hash) {
      if (erro) {
        return resposta.status(500).json(erro);
      }
  
      novoUsuario.senha = hash;
      let usuario = await UsuarioModel.create(novoUsuario);
      usuario.senha = undefined;
  
      resposta.status(201).json(usuario);
    });
  },

  buscarUsuarios: async function (requisicao, resposta) {
    const usuarios = await UsuarioModel.find({});
    resposta.status(200).json({ usuarios });
  },

  atualizarUsuario: async function (requisicao, resposta) {
    requisicao.headers['authorization'] = undefined;
    
    const usuario = requisicao.headers;

    if (!usuario.usuario) {
      return resposta.status(400).send('Informe o usuário a ser atualizado.');
    }

    if (usuario.senha) {
      usuario.senha = await bcrypt.hash(usuario.senha, 10);
    }

    const { modifiedCount } = await UsuarioModel.updateOne({ usuario: usuario.usuario },  { $set: usuario });
    
    if (modifiedCount === 0) {
      return res.status(500).send('Não foi possível atualizar o usuário.');
    }

    const usuarioAtualizado = await UsuarioModel.findOne({ usuario: usuario.usuario });

    resposta.status(200).json({ usuario: usuarioAtualizado });
  },

  deletarUsuario: async function (requisicao, resposta) {
    const { usuario } = requisicao.headers;

    const { deletedCount } = await UsuarioModel.deleteOne({ usuario });

    if (deletedCount === 0) {
      resposta.status(500).json({ msg: 'Não foi possível deletar o usuário!' });
    
    } else {
      resposta.status(204).send();
      
    }
  },
};

module.exports = UsuarioController;