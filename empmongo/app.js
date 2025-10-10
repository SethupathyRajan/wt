const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const url = "mongodb://127.0.0.1:27017";
const dbName = "employeeDB";

MongoClient.connect(url).then(client => {
  const db = client.db(dbName);
  const employees = db.collection('employees');

  app.get('/employees', async (req, res) => {
    res.json(await employees.find().toArray());
  });

  app.post('/employees', async (req, res) => {
    await employees.insertOne(req.body);
    res.send("Employee added");
  });


  app.put('/employees/:id', async (req, res) => {
    await employees.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.send("Employee updated");
  });


  app.delete('/employees/:id', async (req, res) => {
    await employees.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send("Employee deleted");
  });

  app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
}).catch(err => console.error("❌ DB Connection Error:", err));
