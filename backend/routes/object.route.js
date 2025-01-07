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

router.get("/", getObjects);
router.post("/", createObject);
router.get("/:id", getObject);
router.put("/:id", updateObject);
router.delete("/:id", deleteObject);

module.exports = router;
