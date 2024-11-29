const express = require('express');

const routes = express.Router();
const Clientes = require('./controller/clientes');
const Fornecedores = require('./controller/fornecedores');
const Pedidos = require('./controller/pedidos');
const Produtos = require('./controller/produtos');
const Telefone = require('./controller/telefone');

routes.get('/', (req, res) => {
  return res.json({ message: 'API projetocantina executando' });
});

routes.post('/clientes', Clientes.create);
routes.get('/clientes', Clientes.read);
routes.put('/clientes', Clientes.update);
routes.delete('/clientes/:id', Clientes.del);

routes.post('/fornecedores', Fornecedores.create);
routes.get('/fornecedores', Fornecedores.read);
routes.put('/fornecedores/:id', Fornecedores.update);
routes.delete('/fornecedores/:id', Fornecedores.del);

routes.post('/pedidos', Pedidos.create);
routes.get('/pedidos', Pedidos.read);
routes.put('/pedidos', Pedidos.update);
routes.delete('/pedidos/:id', Pedidos.del);

routes.post('/produtos', Produtos.create);
routes.get('/produtos', Produtos.read);
routes.put('/produtos', Produtos.update);
routes.delete('/produtos/:id', Produtos.del);

routes.post('/telefone', Telefone.create);
routes.get('/telefone', Telefone.read);
routes.put('/telefone', Telefone.update);
routes.delete('/telefone/:id', Telefone.del);

module.exports = routes;