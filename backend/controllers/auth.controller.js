const User = require("../models/user.model.js");

const signUp = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signOut = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signUp, signIn, signOut };
