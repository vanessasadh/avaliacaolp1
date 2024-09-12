//npm i node-cron
const cron = require('node-cron');
const axios = require('axios');
const { EventEmitter } = require('events');

const api = axios.create({ baseURL: 'http://localhost:3000' });
const emissorEvento = new EventEmitter();
const periodo = '0 */2 * * * *'; // Dois minutos
// const periodo = '*/5 * * * * *'; // Cinco segundos
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmUyMDkyYzhjYWRlODE1MzYwZjc0ZmMiLCJ1c3VhcmlvIjoidmFuZXNzYSIsImVtYWlsIjoidmFuZXNzYS5nb21lczNAZXN0dWRhbnRlLmlmbXMuZWR1LmJyIiwic2VuaGEiOiIkMmIkMTAkend5aHdZaDF0bWNRQ2ljczI1NjVadUZkN0MzZnpjSW9vNUJjUXYvRTVSbFZZNm5UWGxVay4iLCJfX3YiOjAsImlhdCI6MTcyNjA5MDE2OSwiZXhwIjoxNzI2MzQ5MzY5fQ.c-KgC8iiK3SrUPqZr_yo69VIyEQS-ciy-FaHeAuVbeM';

let contador = 1;

async function cadastrarProduto() {
  let cabecalhos = {
    Authorization: token,
    nome: 'Produto ' + contador,
    preco: 10.00
  };

  try {
    await api.post('/produto', undefined, { headers: cabecalhos });
    console.log(`Item Produto ${contador++} cadastrado com sucesso!`);

  } catch (error) {
    if (error.code === 401) {
      emissorEvento.emit('acessoNegado');

    } else {
      emissorEvento.emit('erroInternoServidor');
    }
  }
}

function acessoNegado() {
  console.log('O token informado é inválido.');
}

function erroInternoServidor() {
  console.log('Houston, temos um problema.');
}

emissorEvento.on('cadastrarProduto', cadastrarProduto);
emissorEvento.on('acessoNegado', acessoNegado);
emissorEvento.on('erroInternoServidor', erroInternoServidor);

cron.schedule(periodo, async () => {
  emissorEvento.emit('cadastrarProduto');
});