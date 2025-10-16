const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const url = "mongodb://127.0.0.1:27017";
const dbName = "eventDB";
let db, events, participants;

MongoClient.connect(url)
  .then(client => {
    db = client.db(dbName);
    events = db.collection('events');
    participants = db.collection('participants');
    console.log("MongoDB connected");
  })
  .catch(err => console.error(err));

app.get('/events', async (req, res) => res.json(await events.find().toArray()));

app.post('/events', async (req, res) => {
  await events.insertOne(req.body);
  res.json({ message: 'Event added' });
});

app.put('/events/:id', async (req, res) => {
    const updateData = { ...req.body };
    delete updateData._id;
  await events.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });
  res.json({ message: 'Event updated' });
});

app.delete('/events/:id', async (req, res) => {
  await events.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: 'Event deleted' });
});

app.get('/participants', async (req, res) => res.json(await participants.find().toArray()));

app.post('/participants', async (req, res) => {
  await participants.insertOne(req.body);
  res.json({ message: 'Participant registered' });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
