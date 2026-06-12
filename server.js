const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const uri = process.env.MONGODB_URI || "mongodb://nandhika:leviaot123@ac-zcm7dap-shard-00-00.oiye0pf.mongodb.net:27017,ac-zcm7dap-shard-00-01.oiye0pf.mongodb.net:27017,ac-zcm7dap-shard-00-02.oiye0pf.mongodb.net:27017/?ssl=true&replicaSet=atlas-o339h3-shard-0&authSource=admin&appName=Cluster0";
const client = new MongoClient(uri);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

async function connectDB() {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("portfolio");
    const projects = db.collection("projects");

    await projects.deleteMany({});
    await projects.insertMany([
        { title: "Calculator App", description: "A calculator application built with JavaScript", tech: ["HTML", "CSS", "JavaScript"] },
        { title: "Library Management System", description: "A system to manage library books and records", tech: ["JavaScript", "Node.js"] },
        { title: "Student Management System", description: "A system to manage student data and records", tech: ["JavaScript", "Node.js"] },
    ]);
}
connectDB();

app.get("/api/projects", async (req, res) => {
    const db = client.db("portfolio");
    const projects = await db.collection("projects").find().toArray();
    res.json(projects);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});