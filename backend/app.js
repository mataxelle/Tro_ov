require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AuthRoute = require("./routes/auth.route.js");
const UserRoute = require("./routes/user.route.js");
const ObjectRoute = require("./routes/object.route.js");
const app = express();

console.log("NODE_ENV is:", process.env.NODE_ENV);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend origine
    credentials: true, // Cookies authorization
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

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
