const { User, validateUser, loggeUser } = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const validatedData = validateUser(req.body);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({ message: "Invalid credentials !" });
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
    const validatedData = loggeUser(req.body);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials !" });
    }

    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials !" });
    }

    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.S_TOKEN,
      { expiresIn: "24h"}
    );

    res.status(200).json({
      userId: existingUser.id,
      token: token,
    });
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
