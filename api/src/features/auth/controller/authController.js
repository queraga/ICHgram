import bcrypt from "bcryptjs";
import { User } from "../../../entities/user/model/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, fullName, username, password } = req.body;

    if (!email || !fullName || !username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      fullName,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullName,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        website: user.website,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
