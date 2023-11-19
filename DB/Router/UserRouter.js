import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModal } from "../Model/UserModel.js";


const router = express.Router();

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const findUser = await UserModal.findOne({ email });
    if (findUser) {
      return res.status(400).json({ Error: "User Already Exsist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const addUser = await UserModal({
      username,
      email,
      password: hashpassword,
    });
    await addUser.save();
    res.status(200).json({ message: "User added SuccessFully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: `${error.message}` });
  }
});

router.post("/log-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await UserModal.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ Error: "User Not Found in the Database" });
    }
    const compare_password = await bcrypt.compare(password, findUser.password);
    if (!compare_password) {
      return res.status(400).json({ Error: "Invalid Password" });
    }
    const token = jwt.sign({ _id: findUser._id }, process.env.secretkey);
    const { password: pass, ...userdata } = findUser._doc;
    const response = { ...userdata, token };
    res
      .status(200)
      .json({
        message: "logged-in Successfully",
        token,
        userID: findUser._id,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: `${error.message}` });
  }
});

export { router as UserRouter };
