const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models").user;
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password)
  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, password: user.password, role: user.role }, process.env.jwtSecret, { expiresIn: "1h" });

    // Return token
    res.json({
      message: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", err: error });
  }
};

exports.register = async (req, res) => {
  const { email, name, address, password } = req.body;
  try {
    // Check if user with the same username already exists
    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const pwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      name,
      address,
      password: pwd,
    });

    // Generate JWT token
    const token = jwt.sign({ email: newUser.email, password: newUser.password, role: newUser.role }, `${process.env.jwtSecret}`, { expiresIn: "1h" });

    // Return token
    res.json({
      data: {
        email: newUser.email,
        name: newUser.name,
        address: newUser.address,
      },
      token,
      message: "Registration Success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
