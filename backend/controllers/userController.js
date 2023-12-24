const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Register new user
// @route POST /api/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);

    throw new Error("Please fill all fields");
  }

  //check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(401);

    throw new Error("Email already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  //create user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      ticked: user.ticked,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error, account not created");
  }
});

// @desc Authenticate a user
// @route /api/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for email in database
  const user = await User.findOne({ email });

  //check password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("login error");
  }
});

// @desc Get user data
// @route GET /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
