const { User, validateUser } = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const validatedData = validateUser(req.body);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({ message: "User email already exists !" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    const user = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User create successfully!" });
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
