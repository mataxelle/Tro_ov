const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/user.model.js");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  // If in cookies
  if (req.cookies && req.cookies.authToken) {
    token = req.cookies.authToken;
  }
  // If header Authorization
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token
  if (!token) {
    return res.status(401).json({ message: "Not Authorized 1 !" });
  }
  try {
    token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    // Retrive the user informations without the password
    req.user = await User.findById(userId).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Not Authorized 2 !" });
  }
});

module.exports = { auth };
