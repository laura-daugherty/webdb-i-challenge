const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  db('accounts')
  .then(accounts => {
    res.status(200).json(accounts)
  })
  .catch(err => {
    res.status(500).json({error: "problem retrieving accounts"})
  })
})

server.post('/', (req, res) => {
  newAcct = req.body;
  db('accounts')
  .insert(newAcct, "id")
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({error: "problem"})
  })
})

server.put('/:id', (req, res) => {
  changes = req.body;
  db('accounts')
  .where('id', '=', req.params.id)
  .update(changes)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({error: "problem"})
  })
})

server.delete('/:id', (req, res) => {
  db('accounts')
  .where('id', '=', req.params.id)
  .del()
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({error: "problem"})
  })
})

module.exports = server;