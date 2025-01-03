const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

const mongoUri = `mongodb+srv://${process.env.Mongo_ID}:${process.env.Mongo_MP}@cluster0.ruqtd.mongodb.net/${process.env.Mongo_BDName}?retryWrites=true&w=majority&appName=Cluster0`;
console.log("MongoDB URI:", mongoUri);
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) =>
    console.error("Connexion à MongoDB échouée :", error.message)
  );

module.exports = app;
