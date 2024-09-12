const express = require('express');
const roteador = express.Router();
const autenticacao = require('./middlewares/autenticacao');
const UsuarioController = require('./controller/usuarios');

roteador.get('/usuarios', autenticacao.autenticar, UsuarioController.buscarUsuarios);
roteador.post('/usuario', UsuarioController.cadastrarUsuario);
roteador.put('/usuario', autenticacao.autenticar, UsuarioController.atualizarUsuario);
roteador.delete('/usuario', autenticacao.autenticar, UsuarioController.deletarUsuario);

roteador.get('/', function (req, res) {
  res.send('<h1>Olá!!</h1>');
});

exports.roteador = roteador;