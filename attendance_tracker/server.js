const express = require("express");
const cors = require("cors");
const {MongoClient,ObjectId} = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db,attendance;

async function connectDB(){
    await client.connect();
    console.log("MongoDB connected");
    db = client.db("attendancedb");
    attendance = db.collection("attendance");
}

connectDB();

app.get("/attendance",async(req,res)=>{
    const records = await attendance.find({}).toArray();
    res.json(records);
});

app.post("/attendance",async(req,res)=>{
    await attendance.insertOne(req.body);
    res.json({message:"added"});
});

app.put("/attendance/:id",async(req,res)=>{
    const {id} = req.params;
    await attendance.updateOne({_id:new ObjectId(id)},{$set:{status:req.body.status}});
    res.json({message:"updated"});
});

app.delete("/attendance/:id",async(req,res)=>{
    const {id} = req.params;
    await attendance.deleteOne({_id:new ObjectId(id)});
    res.json({message:"deleted"});
    
});


app.listen(3000,()=>{
    console.log("server has started");
})