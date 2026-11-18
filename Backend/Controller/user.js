import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, gmail, password } = req.body;

  try {
    let user = await User.findOne({ gmail });

    if (user) return res.json({ message: "User already Exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    // if Not exists then create
    user = await User.create({ name, gmail, password: hashPassword });

    res.json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { gmail, password } = req.body;
  try {
    let user = await User.findOne({ gmail });

    if (!user) return res.json({ message: "User not Exists" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.json({ message: "Invalid Credentials" });

    const token = jwt.sign({ userId: user._id }, "!@#$%^&*()", {
      expiresIn: "1d",
    });

    res.json({ message: `Welcome ${user.name}`, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  res.json({ user: req.user });
};
