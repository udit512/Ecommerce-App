import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  var auth = false;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      auth = true;
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized, wrong token");
    }
  }
  if (!auth) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

export default protect;
