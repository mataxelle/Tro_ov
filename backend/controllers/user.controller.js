const { User } = require("../models/user.model.js");

const getProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const profile = await User.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { name, email } = req.body;
    const newProfile = { name, email };
    const updatedProfile = await User.findByIdAndUpdate(id, newProfile, {
      new: true,
      runValidators: true,
    });

    if (!updatedProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ status: "Success", results: updatedProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const profile = await User.findByIdAndDelete(id);

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.clearCookie('authToken', { path: '/' });
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile, deleteProfile };
