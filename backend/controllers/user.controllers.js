import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
    });
  } else {
    res.status(401);
    return res.json({
      message: "Invalid email or password",
    });
  }
});

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
    fullName: req.user.fullName,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @desc Register a new user
// route POST /api/users/auth
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (!fullName) {
    res.status(400);
    throw new Error("Full Name is required");
  }
  if (!username) {
    res.status(400);
    throw new Error("Username is required");
  }
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  if (!password || password.length < 6) {
    res.status(400);
    throw new Error("Password is required and must have at least 6 characters");
  }

  const user = await User.create({
    fullName,
    username,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      fullName: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Update a user
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);
  if (user) {
    (user.username = req.body.username || user.username),
      (user.fullName = req.body.fullName || user.fullName),
      (user.email = req.body.email || user.email);

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      message: "Data successfully updated",
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc Delete user
// route DELETE /api/users/id
// @access Public
const deleteUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete User Profile" });
});

export { authUser, registerUser, updateUserProfile, deleteUserProfile, logoutUser, getUserProfile };
