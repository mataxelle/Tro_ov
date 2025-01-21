const express = require("express");
const router = express.Router();
const {
  authCheck,
  signUp,
  signIn,
  signOut
} = require("../controllers/auth.controller.js");

router.get("/authCheck", authCheck);
//router.post("/refresh", refreshToken);
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/signOut", signOut);

module.exports = router;
