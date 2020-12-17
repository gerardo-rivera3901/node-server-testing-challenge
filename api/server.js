const express = require('express');
const Chihuahuas = require('./chihuahuas/chihuahua-model');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/chihuahuas', async (req, res) => {
  try {
    const data = await Chihuahuas.getAll();
    if(!data.length) {
      res.status(404).json({ message: 'No chihuahuas found'});
    } else {
      res.status(200).json(data);
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

server.get('/chihuahuas/:id', async (req, res) => {
  try {
    const data = await Chihuahuas.getById(req.params.id);
    if(!data) {
      res.status(404).json({ message: 'No chihuahua was found!'});
    } else {
      res.status(200).json(data);
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

server.post('/chihuahuas', async (req, res) => {
  try {
    const newPup = await Chihuahuas.insert(req.body);
    res.status(201).json(newPup);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

server.delete('/chihuahuas/:id', async (req, res) => {
  try {
    const foundPup  = await Chihuahuas.getById(req.params.id);
    if(!foundPup) {
      res.status(404).json({ message: 'This chihuahua id does not exist!!' });
    } else {
      await Chihuahuas.remove(foundPup.id);
      res.status(200).json({ message: `Chihuahua with the id of ${foundPup.id} was deleted`});
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = server;