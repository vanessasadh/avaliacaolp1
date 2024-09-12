const Produtos = require('../model/produto.js');

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produtos.find({});
    res.status(200).send(produtos);
  } catch (erro) {
    console.log(erro);
    res.status(500).send({ msg: '[ERRO]: Erro o listar!', detalhes: erro });
  }
}

exports.adicionarProduto = async (req, res) => {
  //req.body OU req.params OU req.query
  const novoProduto = req.headers;
  if (!novoProduto.nome || !novoProduto.preco) {
    res.send({ msg: '[ERRO]: Informar nome e preço!' });
  } else {
    try {
      await Produtos.create(novoProduto);
      res.send({ msg: '[SUCESSO]: Produto adicionado!' });
    } catch (erro) {
      console.log(erro);
      res.send({ msg: '[ERRO]: Erro ao cadastrar', detalhes: erro });
    }
  }
}

exports.editarProduto = async (req, res) => {
  const produto = req.headers;
  if (!produto.nome || !produto.preco) {
    return res.send({ msg: '[ERRO]: Informar nome e preço!' });
  }
  try {
    const produtoEditado = await Produtos.findOneAndUpdate({ nome: produto.nome }, { preco: produto.preco });
    if (produtoEditado == null)
      res.send({ msg: '[AVISO]: Produto não existe no BD!' });
    else
      res.send({ msg: '[SUCESSO]: produto editado!' });
  } catch (erro) {
    console.log(erro);
    res.send({ msg: '[ERRO]: Erro ao editar', detalhes: erro });
  }
}

exports.removerProduto = async (req, res) => {
  const produto = req.headers;
  if (!produto.nome)
    return res.send({ msg: '[ERRO]: Informar nome!' });
  try {
    const produtoRemovido = await Produtos.findOneAndDelete({ nome: produto.nome });
    if (produtoRemovido == null)
      res.send({ msg: '[AVISO]: Produto não existe no BD!' });
    else
      res.send({ msg: '[SUCESSO]: produto removido!' });
  } catch (erro) {
    console.log(erro);
    res.send({ msg: '[ERRO]: Erro ao remover', detalhes: erro });
  }
}

