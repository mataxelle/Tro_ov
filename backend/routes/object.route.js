const express = require("express");
const { auth } = require("../middleware/auth.middleware.js");
const router = express.Router();
const {
  getObjects,
  createObject,
  getObject,
  updateObject,
  deleteObject,
} = require("../controllers/object.controller.js");

router.get("/", auth, getObjects);
router.post("/", auth, createObject);
router.get("/:id", auth, getObject);
router.put("/:id", auth, updateObject);
router.delete("/:id", auth, deleteObject);

module.exports = router;
