const express = require("express");
const mongoose = require("mongoose");
const ObjectRoute = require("./routes/object.route.js");
const app = express();

app.use(express.json());

require("dotenv").config();

app.use("/api/objects", ObjectRoute);

const mongoUri = `mongodb+srv://${process.env.Mongo_ID}:${process.env.Mongo_MP}@cluster0.ruqtd.mongodb.net/${process.env.Mongo_BDName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) =>
    console.error("Connexion à MongoDB échouée :", error.message)
  );

module.exports = app;
