const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const UsuarioModel = require('../model/usuario');
const chavePrivada = process.env.CHAVE_JWT || '';

dotenv.config();

exports.autenticar = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(400).json({ msg: 'Token pendente!' });
  }

  jwt.verify(token, chavePrivada, (err, decoded) => {
    if (err) {
      console.error('date: ', err.date);
      console.error('expiredAt: ', err.expiredAt);
      console.error('inner: ', err.inner);
      console.error('message: ', err.message);
      console.error('name: ', err.name);
      console.error(err.stack);
      return res.status(401).json({ msg: 'Token inválido!' });
    }

    next();
  });
}

exports.logar = async (req, res) => {
  const { email, senha } = req.headers;

  const usuarioEncontrado = await UsuarioModel.findOne({ email }).select('+senha');

  if (!usuarioEncontrado) {
    return res.status(404).json({ msg: 'E-mail não encontrado!' });
  }

  bcrypt.compare(senha, usuarioEncontrado.senha, function (erro, autenticado) {
    if (erro) {
      return res.status(400).json(erro);
    }

    if (!autenticado) {
      res.status(401).json({ msg: 'Usuário ou Senha errados!' });

    } else {
      const token = jwt.sign(usuarioEncontrado.toJSON(), chavePrivada);
      res.status(200).json({ token });
    }
  });

}