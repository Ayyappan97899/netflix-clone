const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.keyValue) {
      res.status(500).json(`${Object.keys(err.keyValue)[0]} is already exist`);
    }
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(500).json("Wrong email!");
    }
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);

    const orginalpassword = bytes.toString(CryptoJS.enc.Utf8);
    if (orginalpassword !== req.body.password) {
      res.status(500).json("Wrong password!");
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { password, ...info } = user._doc;
    res.status(201).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
