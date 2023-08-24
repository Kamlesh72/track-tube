import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      if (await userModel.findOne({ email }))
        return res.send({ ok: false, message: "User already exists" });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        ...req.body,
        password: hashedPassword,
      });
      await newUser.save();
      res.send({ ok: true, message: "User register successful" });
    } else {
      res.send({ ok: false, message: "All fields required" });
    }
  } catch (err) {
    console.log(err);
    res.send({ ok: false, message: "Some unknown error occurred" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await userModel.findOne({ email });
      if (!user) return res.send({ ok: false, message: "User doesn't exist" });
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched)
        return res.send({
          ok: false,
          message: "User credentials are not valid",
        });
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      res.send({
        ok: true,
        message: "User login successful",
        name: user.name,
        token,
      });
    } else {
      res.send({ ok: false, message: "All fields required" });
    }
  } catch (err) {
    console.log(err);
    res.send({ ok: false, message: "Some unknown error occurred" });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    // WORK IN PROGRESS
    console.log(req.body);
    res.send({ ok: true });
  } catch (err) {
    console.log(err);
    res.send({ ok: false, message: "Some unknown error occurred" });
  }
};
