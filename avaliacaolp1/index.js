//email temporario mongodbatlas wocerih166@leacore.com
/*
import express from 'express';
const app = express();
import mongoose from 'mongoose';
*/
const express = require('express');
const api = express();
require('dotenv').config();
const URL_BD = process.env.URL_BD || '';
const portaApi = 3000;
const mongoose = require('mongoose');
const { roteador } = require('./indexExemploTeoria.js');

mongoose.connect(URL_BD);

mongoose.connection.on('connected', () => {
    console.log('API conectada ao BD!');
});

mongoose.connection.on('disconnected', () => {
    console.log('API foi desconectada do BD!');
});

mongoose.connection.on('error', (erro) => {
    console.log('Erro ao conectar no BD! ', erro);
});

//function() {} é similar a () => {}

api.use(express.json());

api.get('/status', function (req, res) {
    res.send('<h3>API Online!</h3>');
});

api.listen(portaApi, function() {
    console.log('API Online!');
});

const produtosController = require('./controller/produto.js');

const autenticacao = require('./middlewares/autenticacao.js');

api.post('/login', autenticacao.logar);
api.get('/produtos', autenticacao.autenticar, produtosController.listarProdutos);
api.post('/produto', autenticacao.autenticar, produtosController.adicionarProduto);
api.put('/produto', autenticacao.autenticar, produtosController.editarProduto);
api.delete('/produto', autenticacao.autenticar, produtosController.removerProduto);
api.use('/', roteador);