const express = require("express");
const { auth } = require("../middleware/auth.middleware.js");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/user.controller.js");

router.get("/me", auth, getProfile);
router.put("/me", auth, updateProfile);
router.delete("/me", auth, deleteProfile);

module.exports = router;
