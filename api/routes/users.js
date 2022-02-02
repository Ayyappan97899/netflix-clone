const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const uploadFiles = require("../config");
const checkObjectId = require("../middleware/checkId");

//create user

router.post(
  "/create",
  verify,
  uploadFiles.fields([{ name: "profile", maxCount: 1 }]),
  async (req, res) => {
    const profile = req.files["profile"][0];
    let password;
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }

      try {
        const createUser = await new User({
          username: req.body.username,
          email: req.body.email,
          password: password,
          gender: req.body.gender,
          profile: profile.path,
        });
        await createUser.save();
        const createdtedUser = await User.find();

        const createdtedUserList = createdtedUser.map((user) => {
          const { password, ...info } = user._doc;
          return info;
        });

        res.status(201).json(createdtedUserList);
      } catch (err) {
        res.status(403).json({ error: err.message });
      }
    } else {
      res.status(403).json("Account not created!");
    }
  }
);

// Update

router.put(
  "/:id",
  verify,
  uploadFiles.fields([{ name: "profile", maxCount: 1 }]),
  async (req, res) => {
    const profile = req.files["profile"][0];
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }

      try {
        await User.findByIdAndUpdate(
          req.params.id,
          {
            username: req.body.username,
            email: req.body.email,
            profile: profile.path,
          },
          { new: true }
        );
        const updatedUser = await User.find();

        const updateUserList = updatedUser.map((user) => {
          const { password, ...info } = user._doc;
          return info;
        });

        res.status(201).json(updateUserList);
      } catch (err) {
        res.status(403).json({ error: err.message });
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  }
);

// Delete

router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      const deletedUser = await User.find();
      res.status(201).json(deletedUser);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

// Get

router.get("/find/:id", checkObjectId("id"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(201).json(info);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

// GetAll

router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5) //new users list
        : await User.find();
      res.status(201).json(users);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
});

//get Stats

router.get("/stats", verify, async (req, res) => {
  try {
    console.log("work");
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
