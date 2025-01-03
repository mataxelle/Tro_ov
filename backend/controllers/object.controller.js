const Object = require("../models/object.model.js");

const getObjects = async (req, res) => {
  try {
    const objects = await Object.find();
    res.status(200).json(objects);
  } catch (error) {
    res.status(404).json({ message: "Objects not found" });
  }
};

const createObject = async (req, res) => {
  try {
    const object = new Object({
      name: req.body.name,
      description: req.body.description,
      colors: req.body.colors,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
    });

    await object.save();
    res.status(201).json({ message: "Object saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getObject = async (req, res) => {
  try {
    const id = req.params.id;
    const object = await Object.findById(id);

    if (!object) {
      return res.status(404).json({ message: "Object not found" });
    }

    res.status(200).json(object);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateObject = async (req, res) => {
  try {
    const id = req.params.id;
    const object = await Object.findByIdAndUpdate(id, req.body);

    if (!object) {
      return res.status(404).json({ message: "Object not found" });
    }

    const updatedObject = await Object.findById(id);
    res.status(200).json(updatedObject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteObject = async (req, res) => {
  try {
    const id = req.params.id;
    const object = await Object.findByIdAndDelete(id);

    if (!object) {
      return res.status(404).json({ message: "Object not found" });
    }

    res.status(200).json({ message: "Object deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getObjects,
  createObject,
  getObject,
  updateObject,
  deleteObject,
};
