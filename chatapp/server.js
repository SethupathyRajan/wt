const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors'); 
const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'chatDB';

async function main() {
  await client.connect();
  console.log('Connected to MongoDB');
  const db = client.db(dbName);
  const messages = db.collection('messages');

  app.post('/message', async (req, res) => {
    try {
      const { name, text } = req.body;
      if (!name || !text) return res.status(400).json({ error: 'Name and message required' });
      await messages.insertOne({ name, text, time: new Date() });
      res.json({ message: 'Message saved!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/messages', async (req, res) => {
    try {
      const allMessages = await messages.find({}).sort({ time: 1 }).toArray();
      res.json(allMessages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}

main().catch(console.error);
