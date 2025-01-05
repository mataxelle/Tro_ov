const express = require("express");
const mongoose = require("mongoose");
const AuthRoute = require("./routes/auth.route.js");
const UserRoute = require("./routes/user.route.js");
const ObjectRoute = require("./routes/object.route.js");
const app = express();

app.use(express.json());

require("dotenv").config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const mongoUri = `mongodb+srv://${process.env.Mongo_ID}:${process.env.Mongo_MP}@cluster0.ruqtd.mongodb.net/${process.env.Mongo_BDName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) =>
    console.error("Connexion à MongoDB échouée :", error.message)
  );

app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/objects", ObjectRoute);

module.exports = app;
