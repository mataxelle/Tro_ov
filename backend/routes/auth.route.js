const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  signOut,
} = require("../controllers/auth.controller.js");

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/signOut", signOut);

module.exports = router;
