const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/user.model.js");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;

      // Retrive the user informations without the password
      req.user = await User.findById(userId).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Not Authorized !" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not Authorized !" });
  }
});

module.exports = { auth };
